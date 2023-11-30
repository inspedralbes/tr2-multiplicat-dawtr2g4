const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io'); // npm install socket.io --> That will install the module and add the dependency to package.json
const { getPregunta } = require('./communicationManager'); // Ruta correcta al archivo communicationManager.js
const cors = require('cors');

const app = express();
app.use(cors())

const server = createServer(app); // Express initializes app to be a function handler that you can supply to an HTTP server
//const io = new Server(server); // We initialize a new instance of socket.io by passing the server (the HTTP server) object
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Reemplaza con la URL de tu aplicación Vue.js
    methods: ["GET", "POST"]
  }
});
const port = 3000 //node és el seu propi servidor. a la nostra aplicació que escolti per aquest port

const sales = [{
  jugadors: [{
    id: socket.id,
    equip: equip,
    baseActual: 0,
    votacioBase: null,
    votacioResposta: null
  }],
  equips: [
    {
      nJugadors: 0,
      punts: 0
    },
    {
      nJugadors: 0,
      punts: 0
    }
  ],
  totalVotacions: 0,
  equipAtacant: 0,
  categoria: 1,
  preguntaActual: null,
  nomSala: "Sala 1"
}]

const TEMPS_ESCOLLIR_BASE = 10;
const TEMPS_VOTAR_RESPOSTA = 30;
let cronometre;
let intervalId;

app.get('/api/salas', (req, res) => {
  res.json({ sales: sales })
})

io.on('connection', (socket) => { // We listen on the connection event for incoming sockets and log it to the console.
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('seleccionar base', (msg) => {
    io.emit('seleccionar base', msg);
  });

  // Jugador s'uneix a un equip
  socket.on('equip-seleccionat', (indexSala, equip) => {
    // Comprovar si el jugador està en la sala
    let isDinsSala = false
    let sala = sales[indexSala]
    sala.jugadors.forEach(jugador => {
      if (jugador.id === socket.id) {
        isDinsSala = true;
      }
    });

    if (!isDinsSala && equip != 1 && equip != 2) {
      if (equip === 1) {
        sala.equips[0].nJugadors++
      } else {
        sala.equips[1].nJugadors++
      }

      // Afegir jugador a la sala
      sala.jugadors.push({
        id: socket.id,
        equip: equip,
        baseActual: 0,
        votacioBase: null,
        votacioResposta: null
      })

      io.emit('equips-actualitzats', sala)
    }
  })

  // Admin comença la partida
  socket.on('partida-iniciada', (indexSala) => {
    const equipAtacant = Math.floor(Math.random() * 2) + 1; // 1 o 2
    sales[indexSala].equipAtacant = equipAtacant
    socket.emit('partida-iniciada', equipAtacant)
  })

  //Iniciar procés de votació
  socket.on('començar-votacio-dificultat', (indexSala) => {
    cronometre = TEMPS_ESCOLLIR_BASE;
    let sala = sales[indexSala];
    io.emit('començar-votacio-dificultat', cronometre);

    // Decrementem el cronòmetre cada segon i actualitzem a tots els clients
    intervalId = setInterval(async () => {
      cronometre -= 1;
      io.emit('actualitzar-comptador', cronometre);

      // Quan el cronòmetre arriba a zero, el detenim i el resetegem i finalitzem el procés de votació
      if (cronometre === 0) {
        clearInterval(intervalId)
        let dificultatVotada = calcularResultatsDificultat(sala)
        await novaPregunta(sala, dificultatVotada, sala.categoria, [])
      }
    }, 1000);
  })

  // Rebre votacions de les bases d'usuaris
  socket.on('votacio-dificultat', async (indexSala, vot) => {
    if (!esVotValid(vot, false)) return;

    let sala = sales[indexSala];
    let jugador = sala.jugadors.find(j => j.id === socket.id);

    // El jugador votarà si està en la sala, si no ha votat i si és de l'equip que està votant
    if (jugador && !jugador.votacioBase && jugador.equip === sala.equipAtacant) {
      jugador.votacioBase = vot;
      sala.totalVotacions++;
    }

    if (totsHanVotat(sala, false)) {
      clearInterval(intervalId)
      let dificultatVotada = calcularResultatsDificultat(sala);
      await novaPregunta(sala, dificultatVotada, sala.categoria, [])
    }
  })

  async function novaPregunta(sala, dificultat, categoria, preguntesAnteriors) {
    socket.emit('finalitzar-votacio-dificultat', dificultat);
    resetejarVotacions(sala)

    try {
      let pregunta = await getPregunta(dificultat, categoria, preguntesAnteriors);
      sala.preguntaActual = pregunta
      socket.emit('nova-pregunta', pregunta);
    } catch (error) {
      console.error('Error en obtenir la pregunta:', error);
    }

    // Creem el temporitzador i actualitzem cada segon per a notificar els clients
    cronometre = TEMPS_VOTAR_RESPOSTA;
    intervalId = setInterval(async () => {
      cronometre -= 1;
      io.emit('actualitzar-comptador', cronometre);

      if (cronometre === 0) {
        finalitzarVotacionsRespostes(sala)
      }
    }, 1000);
  }

  socket.on('votacio-resposta', (indexSala, vot) => {
    // Vot ha de ser del 0 al 3
    if (!esVotValid(vot, true)) return;

    let sala = sales[indexSala];
    let jugador = sala.jugadors.find(j => j.id === socket.id);

    if (jugador && !jugador.votacioResposta) {
      jugador.votacioResposta = vot;
      sala.totalVotacions++;
    }

    if (totsHanVotat(sala, true)) {
      finalitzarVotacionsRespostes(sala)
    }
  })

  function finalitzarVotacionsRespostes(sala) {
    clearInterval(intervalId);
    const resultats = calcularResultatsRespostes(sala)
    resetejarVotacions(sala)
    socket.emit('finalitzar-votacions-respostes', resultats)

    // Avançar bases i calcular punts
    if(resultats.equipAcertat === 1) {
      sala.jugadors[0].baseActual += sala.preguntaActual.dificultat
      if(sala.jugadors[0].baseActual >= 4) {
        sala.jugadors[0].baseActual = 4
        io.emit('sumar-punt', sala.equipAtacant)
        sala.equipAtacant = sala.equipAtacant === 1 ? 2 : 1
      }
    }
  }

  // Al acertar una pregunta, el jugador avançarà el nombre de bases segons la dificultat
  // Al fallar una pregunta, el torn canvia.
  // Si un jugador arriva a la base (baseActual = 4), suma un punt a l'equip i canvia de torn
  // El primer equip que arrivi a 5 punts, guanya la partida.

});

function calcularResultatsRespostes(sala) {
  const votsEquip1 = [];
  const votsEquip2 = [];
  const indexRespostaCorrecta = sala.preguntaActual.indexRespostaCorrecta;

  // Guarda els vots en els arrays votsEquip1 i votsEquip2
  sala.jugadors.forEach(jugador => {
    if (jugador.votacioResposta) {
      if (jugador.equip === 1) {
        votsEquip1.push(jugador.votacioResposta);
      } else if (jugador.equip === 2) {
        votsEquip2.push(jugador.votacioResposta);
      }
    }
  });

  // Calcular total de vots per equip i percentatge d'encerts
  const totalVotsEquip1 = votsEquip1.reduce((acc, cur) => acc + cur, 0)
  const totalVotsEquip2 = votsEquip2.reduce((acc, cur) => acc + cur, 0)

  const percentatgeCorrecteEquip1 = totalVotsEquip1 === 0 ? 0 : votsEquip1[indexRespostaCorrecta] / totalVotsEquip1;
  const percentatgeCorrecteEquip2 = totalVotsEquip2 === 0 ? 0 : votsEquip2[indexRespostaCorrecta] / totalVotsEquip2;

  const equipAcertat = percentatgeCorrecteEquip1 >= percentatgeCorrecteEquip2 ? 1 : 2;

  return { votsEquip1, votsEquip2, equipAcertat }
}

function calcularResultatsDificultat(sala) {
  let vots = []
  sala.jugadors.forEach(jugador => {
    if (jugador.equip === sala.equipAtacant && jugador.votacioBase) {
      vots.push(jugador.votacioBase)
    }
  })
  let voteCount = { 1: 0, 2: 0, 3: 0 };

  vots.forEach(vot => {
    voteCount[vot]++;
  });

  let maxVotes = Math.max(voteCount[1], voteCount[2], voteCount[3]);
  let opcioMesVotada = Object.keys(voteCount).filter(vot => voteCount[vot] === maxVotes);
  // Si hi ha empat en les votacions, es retorna la base més baixa
  return opcioMesVotada[0]
}


function esVotValid(vot, sonVotsRespostes) {
  // Si els vots són de respostes, van del 0 al 3. Sino, van del 1 al 3
  if (sonVotsRespostes) {
    return vot === 0 || vot === 1 || vot === 2 || vot == 3;
  }
  return vot === 1 || vot === 2 || vot === 3;
}

function totsHanVotat(sala, sonVotsRespostes) {
  // Si els vots són de les respostes, tots han de votar. Sino, només un equip ha de votar
  if (sonVotsRespostes) {
    return sala.totalVotacions === (sala.equips[0].nJugadors + sala.equips[1].nJugadors)
  }
  return sala.totalVotacions === (sala.equipAtacant === 1 ? sala.equips[0].nJugadors : sala.equips[1].nJugadors);
}

function resetejarVotacions(sala) {
  sala.jugadors.forEach(jugador => jugador.votacioBase = null);
  sala.jugadors.forEach(jugador => jugador.votacioResposta = null);
  sala.totalVotacions = 0;
}

server.listen(port, () => { // We make the http server listen on port 3000.
  console.log('server running at http://localhost:3000');
});