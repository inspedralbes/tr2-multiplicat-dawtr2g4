const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io'); // npm install socket.io --> That will install the module and add the dependency to package.json
const { getPregunta } = require('./communicationManager'); // Ruta correcta al archivo communicationManager.js
const cors = require('cors');

const app = express();
app.use(cors());

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
  jugadors: [],
  votacions: 0,
  jugadorsEquip1: 0,
  jugadorsEquip2: 0,
  equipVotant: 0,
  categoria: 1,
  preguntaActual: null,
  nomSala: 'Sala 1'
},
{
  jugadors: [],
  votacions: 0,
  jugadorsEquip1: 0,
  jugadorsEquip2: 0,
  equipVotant: 0,
  categoria: 2,
  preguntaActual: null,
  nomSala: 'Sala 2'
},
{
  jugadors: [],
  votacions: 0,
  jugadorsEquip1: 0,
  jugadorsEquip2: 0,
  equipVotant: 0,
  categoria: 3,
  preguntaActual: null,
  nomSala: 'Sala 3'
}]

const TEMPS_ESCOLLIR_BASE = 10;
let cronometre;

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
    sales[indexSala].jugadors.forEach(jugador => {
      if (jugador.id === socket.id) {
        //return;
        isDinsSala = true;
      }
    });

    if (isDinsSala == false) {
      // Comprovar equip es 1 o 2
      if (equip !== 1 && equip != 2) {
        return;
      } else if (equip === 1) {
        sales[indexSala].jugadorsEquip1++
      } else {
        sales[indexSala].jugadorsEquip2++
      }

      // Afegir jugador a la sala
      sales[indexSala].jugadors.push({
        id: socket.id,
        equip: equip,
        baseActual: 0,
        votacioBase: null,
        votacioResposta: null
      })
    }
    io.emit('equips-actualitzats', sales[indexSala])
  })

  // Admin comença la partida
  socket.on('partida-iniciada', (indexSala) => {
    const equipVotant = Math.floor(Math.random() * 2) + 1; // 1 o 2
    sales[indexSala].equipVotant = equipVotant
    socket.emit('partida-iniciada', equipVotant)
  })

  //Iniciar procés de votació
  socket.on('començar-votacio', (isVotacioEnCurs) => {
    cronometre = TEMPS_ESCOLLIR_BASE;
    data = { isVotacioEnCurs: isVotacioEnCurs, cronometre: cronometre };
    io.emit('començar-votacio', data);

    // Decrementem el cronòmetre cada segon i actualitzem a tots els clients
    const intervalId = setInterval(() => {
      cronometre -= 1;
      io.emit('actualitzar-comptador', cronometre);

      // Quan el cronòmetre arriba a zero, el detenim i el resetegem i finalitzem el procés de votació
      if (cronometre === 0) {
        clearInterval(intervalId);
        io.emit('finalitzar-votacio', false);
        cronometre = TEMPS_ESCOLLIR_BASE;
      }
    }, 1000);
  })

  // Rebre votacions de les bases d'usuaris
  socket.on('votacio-base', async (indexSala, vot) => {
    if (!esVotValid(vot, false)) return;

    let sala = sales[indexSala];
    let jugador = sala.jugadors.find(j => j.id === socket.id);

    // El jugador votarà si està en la sala, si no ha votat i si és de l'equip que està votant
    if (jugador && !jugador.votacioBase && jugador.equip === sala.equipVotant) {
      jugador.votacioBase = vot;
      sala.votacions++;
    }

    if (totsHanVotat(sala, false)) {
      let baseMesVotada = calcularVots(sala);
      socket.emit('votacions-bases-final', baseMesVotada);

      let pregunta = await novaPregunta(sala, baseMesVotada, sala.categoria, [])
    }
  })

  async function novaPregunta(sala, dificultat, categoria, preguntesAnteriors) {
    try {
      let pregunta = await getPregunta(dificultat, categoria, preguntesAnteriors);
      sala.preguntaActual = pregunta
      socket.emit('nova-pregunta', pregunta);
    } catch (error) {
      console.error('Error en obtenir la pregunta:', error);
    }
  }

  socket.on('votacio-resposta', (indexSala, vot) => {
    // Vot ha de ser del 0 al 3
    if (!esVotValid(vot, true)) return;

    let sala = sales[indexSala];
    let jugador = sala.jugadors.find(j => j.id === socket.id);

    if (jugador && !jugador.votacioResposta) {
      jugador.votacioResposta = vot;
      sala.votacions++;
    }

    if (totsHanVotat(sala, true)) {
      // Retornar percentatges al front i equip guanyador
      let equipAcertat = calcularEquipAcertat(sala)
    }
  })
});

function calcularEquipAcertat(sala) {
  const votsEquip1 = []
  const votsEquip2 = []

  let indexRespostaCorrecta;

  sala.jugadors.forEach(jugador => {
    if (jugador.votacioResposta && jugador.equip === 1) {
      votsEquip1.push(jugador.votacioResposta)
    } else if (jugador.votacioResposta && jugador.equip === 2) {
      votsEquip2.push(jugador.votacioResposta)
    }
  })
}

function calcularVots(sala) {
  let vots = []
  sala.jugadors.forEach(jugador => {
    if (jugador.equip === sala.equipVotant && jugador.votacioBase) {
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
    return sala.votacions === (sala.jugadorsEquip1 + sala.jugadorsEquip2)
  }
  return sala.votacions === (sala.equipVotant === 1 ? sala.jugadorsEquip1 : sala.jugadorsEquip2);
}

function resetejarVotacions(sala) {
  sala.jugadors.forEach(jugador => jugador.votacioBase = null);
  sala.jugadors.forEach(jugador => jugador.votacioResposta = null);
  sala.votacions = 0;
}

server.listen(port, () => { // We make the http server listen on port 3000.
  console.log('server running at http://localhost:3000');
});