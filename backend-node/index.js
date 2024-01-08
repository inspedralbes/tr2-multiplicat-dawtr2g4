const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { getPregunta } = require('./communicationManager'); // Ruta correcta al archivo communicationManager.js
const cors = require('cors');

const app = express();
app.use(cors())

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://mathball.daw.inspedralbes.cat", "http://tr2g4.daw.inspedralbes.cat", "http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"]
  }
});
const port = 3379;

const sales = [];

const JUGADORS_PER_EQUIP = 5;
const OUTS_ELIMINAR = 3;
const CARRERES_GUANYAR = 5;

const TEMPS_ESCOLLIR_BASE = 10;
const TEMPS_VOTAR_RESPOSTA = 50;
const socketRooms = {};
//let cronometre;
let intervalId;
let calcularEfectes = true;
let efectesCalculats = false;

// Executar funcio per a crear 6 sales
(function () {
  for (let i = 0; i < 6; i++) {
    let sala = {
      jugadors: [],
      equips: [
        { nJugadors: 0, punts: 0 },
        { nJugadors: 0, punts: 0 }
      ],
      rondes: [],
      totalVots: 0,
      equipAtacant: 0,
      categories: [1,2],
      preguntaActual: [],
      resultatsActuals: null,
      nomSala: "Sala " + (i + 1),
      jugadorsBanqueta: [],
      jugadorsCamp: [],
      outs: 0,
      preguntesAnteriors: [],
      cronometre: 0
    }
    sales.push(sala)
  }
})()

app.get('/api/salas', (req, res) => {
  res.json({ sales: sales })
})

io.on('connection', (socket) => {
  console.log('Un usuari s\'ha connectat');

  socket.on('disconnect', () => {
    console.log('Un usuari s\'ha desconnectat');
    clearInterval(intervalId);

    // Quan el jugador es desconnecta, el treiem de la room i la sala
    let room = socketRooms[socket.id];
    if (room) {
      socket.leave(room);
      delete socketRooms[socket.id];
      let indexSala = sales.findIndex(s => s.nomSala === room);
      let sala = sales[indexSala]
      let indexJugador = sala.jugadors.findIndex(j => j.id === socket.id)
      let jugador = sala.jugadors[indexJugador];
      if (jugador) {
        sala.jugadors.splice(indexJugador, 1)
        sala.equips[jugador.equip - 1].nJugadors--;
        if (sala.jugadors.length === 0) {
          natejarSala(sala)
        }
      }
      io.emit('equips-actualitzats', indexSala, sala);
    }
  });

  socket.on('crear-sala', (sala) => {
    // Comprovar si ja existeix una sala amb el mateix nom
    if (sales.find(s => s.nomSala === sala.nom)) {
      return;
    }

    // Crear nova sala
    let novaSala = {
      jugadors: [],
      equips: [
        { nJugadors: 0, punts: 0 },
        { nJugadors: 0, punts: 0 }
      ],
      rondes: [],
      totalVots: 0,
      equipAtacant: 0,
      categories: sala.categories,
      preguntaActual: null,
      resultatsActuals: null,
      nomSala: sala.nom,
      jugadorsBanqueta: [],
      jugadorsCamp: [],
      outs: 0,
      preguntesAnteriors: [],
      cronometre: 0
    }
    sales.push(novaSala);
    io.emit('sala-creada', novaSala);
  });

  socket.on('sala-seleccionada', (indexSala) => {
    let sala = sales[indexSala];
    if (!sala) return;

    // Surt de la sala actual i s'uneix a la nova
    if (socketRooms[socket.id]) {
      socket.leave(socketRooms[socket.id]);
    }

    socket.join(sala.nomSala);
    socketRooms[socket.id] = sala.nomSala;

    socket.emit('sala-seleccionada', sala);
  })

  // Jugador s'uneix a un equip
  socket.on('equip-seleccionat', (indexSala, equip, usrNom) => {
    let sala = sales[indexSala];

    // Comprovar si la sala existeix i el jugador està en la sala
    if (!sala || sala.jugadors.find(jugador => jugador.id === socket.id)) {
      return;
    }

    // Comprova si l'equip és vàlid i incrementa el nombre de jugadors
    if (equip === 1 || equip === 2) {
      sala.equips[equip - 1].nJugadors++;

      // Afegeix el jugador a la sala
      sala.jugadors.push({
        nom: usrNom,
        id: socket.id,
        equip: equip,
        baseActual: 0,
        votacioBase: null,
        votacioResposta: null,
      });

      // Notifica als clients de la sala sobre l'actualització dels equips
      io.emit('equips-actualitzats', indexSala, sala);
    }
  })

  // Admin comença la partida
  socket.on('partida-iniciada', (indexSala) => {
    let sala = sales[indexSala]
    const equipAtacant = Math.floor(Math.random() * 2) + 1; // 1 o 2
    sala.equipAtacant = equipAtacant
    sala.rondes.push({
      equipAtacant: equipAtacant,
      punts: 0
    })
    emplenarJugadorsBanqueta(sala)
    nouJugadorAlCamp(sala);
    io.to(sala.nomSala).emit('partida-iniciada', sala)
  })

  //Iniciar procés de votació
  socket.on('començar-votacio-dificultat', (indexSala) => {
    sales[indexSala].cronometre = TEMPS_ESCOLLIR_BASE;
    let sala = sales[indexSala];
    io.to(sala.nomSala).emit('començar-votacio-dificultat', sala.cronometre);

    // Decrementem el cronòmetre cada segon i actualitzem a tots els clients
    intervalId = setInterval(async () => {
      sala.cronometre -= 1;
      io.to(sala.nomSala).emit('actualitzar-comptador', sala.cronometre);

      // Quan el cronòmetre arriba a zero, el detenim i el resetegem i finalitzem el procés de votació
      if (sala.cronometre === 0) {
        await finalitzarVotacionsDificultat(sala)
      }
    }, 1000);
  })

  socket.on('vot-dificultat', async (indexSala, vot) => {
    if (!esVotValid(vot, false)) return;

    let sala = sales[indexSala];
    let jugador = sala.jugadors.find(j => j.id === socket.id);

    // El jugador votarà si està en la sala, si no ha votat i si és de l'equip que està votant
    if (jugador && !jugador.votacioBase && jugador.equip === sala.equipAtacant) {
      jugador.votacioBase = vot;
      sala.totalVots++;
      io.to(sala.nomSala).emit("vot-dificultat", sala.totalVots)
    }

    if (totsHanVotat(sala, false)) {
      await finalitzarVotacionsDificultat(sala)
    }
  })

  async function finalitzarVotacionsDificultat(sala) {
    clearInterval(intervalId)
    let dificultatVotada = calcularResultatsDificultat(sala)
    io.to(sala.nomSala).emit('finalitzar-votacio-dificultat', dificultatVotada, sala.jugadorsCamp.length);
    resetejarVotacions(sala)
    let indiceAleatorio = Math.floor(Math.random() * sala.categories.length);
    await novaPregunta(sala, dificultatVotada, sala.categories[indiceAleatorio], sala.preguntesAnteriors)
  }

  async function novaPregunta(sala, dificultat, categoria, preguntesAnteriors) {
    // Trucar la API de Laravel per demanar la pregunta

    sala.preguntaActual = [];
    for (let i = 0; i < sala.jugadorsCamp.length; i++) {
      try {
        let pregunta = await getPregunta(dificultat, categoria, preguntesAnteriors);
        pregunta.jugadorId = sala.jugadorsCamp[i].id;
        sala.preguntaActual.push(pregunta);
        sala.preguntesAnteriors.push(parseInt(pregunta.id))
      } catch (error) {
        console.error('Error:', error);
        sala.preguntesAnteriors = []
        preguntesAnteriors = []
        i--
      }
    }
    io.to(sala.nomSala).emit('nova-pregunta', sala.preguntaActual);

    // Creem el temporitzador i actualitzem cada segon per a notificar els clients
    sala.cronometre = TEMPS_VOTAR_RESPOSTA;
    intervalId = setInterval(async () => {
      sala.cronometre -= 1;
      io.to(sala.nomSala).emit('actualitzar-comptador', sala.cronometre);

      if (sala.cronometre === 0) {
        finalitzarVotacionsRespostes(sala)
      }
    }, 1000);
  }

  socket.on('vot-resposta', (indexSala, vot) => {
    // Vot ha de ser del 0 al 3
    //if (!esVotValid(vot, true)) return;
    let sala = sales[indexSala];
    let jugador = sala.jugadors.find(j => j.id === socket.id);

    if (jugador) {
      jugador.votacioResposta = vot;
      if (!vot.some(comprovarTotesPreguntesRespostes)) {
        sala.totalVots++;
        socket.emit('vot-resposta', sala.totalVots)
        io.to(sala.nomSala).emit('total-votacions', sala.totalVots, sala.jugadors.length)
      }
    }

    if (totsHanVotat(sala, true)) {
      finalitzarVotacionsRespostes(sala)
    }
  })

  function finalitzarVotacionsRespostes(sala) {
    clearInterval(intervalId);
    const resultats = calcularResultatsRespostes(sala)
    let indexRespostesCorrectes = resultats.indexRespostesCorrectes;
    delete resultats.indexRespostesCorrectes;
    sala.resultatsActuals = resultats
    resetejarVotacions(sala)
    io.to(sala.nomSala).emit('finalitzar-votacions-respostes', resultats, indexRespostesCorrectes)
  }

  socket.on('tornar-taulell', (indexSala) => {
    let sala = sales[indexSala]
    io.to(sala.nomSala).emit('tornar-taulell');

    calcularEfectes = true;
    efectesCalculats = false;

    // Esperar un segon per a moure jugadors
    setTimeout(() => {
      // Per cada pregunta...
      for (let i = 0; i < sala.resultatsActuals.equipAcertat.length; i++) {
        let esUltimJugador = i === sala.resultatsActuals.equipAcertat.length - 1 ? true : false;
        if (sala.equipAtacant === sala.resultatsActuals.equipAcertat[i]) {
          // Si l'equip atacant ha acertat la pregunta, el jugador associat a la pregunta avança bases,
          moureJugador(sala, sala.preguntaActual[i].dificultat, sala.preguntaActual[i].jugadorId, false, esUltimJugador);
        } else {
          // Si l'equip atacant ha fallat la pregunta, el jugador associat a la pregunta és eliminat...
          moureJugador(sala, sala.preguntaActual[i].dificultat, sala.preguntaActual[i].jugadorId, true, esUltimJugador);
        }
      }
    }, 1000);


  })

  function moureJugador(sala, moviments, jugadorId, isEliminat, esUltimJugador) {
    let jugador = sala.jugadors.find(j => j.equip === sala.equipAtacant)
    jugador.baseActual += moviments

    for (let i = 0; i < sala.jugadorsCamp.length; i++) {
      if (sala.jugadorsCamp[i].id === jugadorId) {
        if (!isEliminat) {
          if (moviments > 1) {
            calcularEfectes = false;
            iniciarComptadorBases(sala, sala.jugadorsCamp[i], moviments)
          } else {
            sala.jugadorsCamp[i].baseActual += moviments;
            io.to(sala.nomSala).emit('moure-jugador', sala);
          }
        } else {
          sala.jugadorsCamp.splice(i, 1);
          sala.outs++;
          io.to(sala.nomSala).emit('jugador-eliminat', sala);
        }

        if (esUltimJugador && calcularEfectes) {
          calcularEfectes = false;
          calcularEfectesRonda(sala)
        }

      }
    }
  }

  function calcularEfectesRonda(sala) {

    if (efectesCalculats) return;
    efectesCalculats = true;

    // Esperar un segon per a calcular els efectes de la ronda
    setTimeout(() => {

      let indexAtacant = sala.equipAtacant === 1 ? 0 : 1;

      for (let i = sala.jugadorsCamp.length - 1; i >= 0; i--) {
        let jugador = sala.jugadorsCamp[i];
        if (jugador.baseActual > 3) {
          sala.equips[indexAtacant].punts++;
          sala.rondes[sala.rondes.length - 1].punts++;
          sala.jugadorsCamp.splice(i, 1);
          sala.jugadorsBanqueta.push(jugador);
        }
      }

      // Si hi ha n outs o no hi ha ningú per batejar es canvia d'equip; si hi ha algún jugador a la banqueta salta al camp a batejar
      if (sala.outs >= OUTS_ELIMINAR || sala.jugadorsBanqueta.length === 0) {
        canviarEquips(sala);
      } else {
        nouJugadorAlCamp(sala);
      }

      io.to(sala.nomSala).emit('moure-jugador', sala)

      //Si un equip fa n carreres guanya el joc
      if (sala.equips[indexAtacant].punts === CARRERES_GUANYAR) {
        io.to(sala.nomSala).emit('finalitzar-partida');
      }

    }, 1000);
  }

  function iniciarComptadorBases(sala, jugador, moviments) {
    let intervalId = setInterval(() => {
      jugador.baseActual++;
      moviments--;
      io.to(sala.nomSala).emit('moure-jugador', sala);
      if (moviments === 0) {
        clearInterval(intervalId)
        // Esperar un segon per a calcular els efectes de la ronda
        calcularEfectesRonda(sala)
      }
    }, 1000);
  }

  function canviarEquips(sala) {
    sala.equipAtacant = sala.equipAtacant === 1 ? 2 : 1
    sala.rondes.push({
      equipAtacant: sala.equipAtacant,
      punts: 0
    })
    io.to(sala.nomSala).emit('canvi-equip', sala.equipAtacant)
    resetejarTorn(sala)
  }

});

function calcularResultatsRespostes(sala) {

  const votsEquip1 = [];
  const votsEquip2 = [];
  const indexRespostesCorrectes = [];

  // Genera un array de votacions per cada pregunta i equip
  for (let i = 0; i < sala.preguntaActual.length; i++) {
    votsEquip1[i] = [0, 0, 0, 0];
    votsEquip2[i] = [0, 0, 0, 0];
  }

  // Guarda l'index de la resposta correcta de cada pregunta
  for (let i = 0; i < sala.preguntaActual.length; i++) {
    indexRespostesCorrectes.push(sala.preguntaActual[i].indexRespostaCorrecta);
  }

  // Guarda els vots en els arrays votsEquip1 i votsEquip2
  for (let i = 0; i < sala.preguntaActual.length; i++) {
    sala.jugadors.forEach(jugador => {
      if (jugador.votacioResposta != null) {
        //console.log("----VOT JUGADOR---- " + jugador.votacioResposta )
        if (jugador.equip === 1) {
          votsEquip1[i][jugador.votacioResposta[i]]++;
        } else if (jugador.equip === 2) {
          votsEquip2[i][jugador.votacioResposta[i]]++;
        }
      }
    });
  }


  // Calcular total de vots per equip i percentatge d'encerts
  const totalVotsEquip1 = [];
  const totalVotsEquip2 = [];
  for (let i = 0; i < sala.preguntaActual.length; i++) {
    totalVotsEquip1.push(votsEquip1[i].reduce((acc, cur) => acc + cur, 0))
    totalVotsEquip2.push(votsEquip2[i].reduce((acc, cur) => acc + cur, 0))
  }


  const percentatgeCorrecteEquip1 = [];
  const percentatgeCorrecteEquip2 = [];
  for (let i = 0; i < sala.preguntaActual.length; i++) {
    percentatgeCorrecteEquip1.push(totalVotsEquip1[i] === 0 ? 0 : votsEquip1[i][indexRespostesCorrectes[i]] / totalVotsEquip1[i]);
    percentatgeCorrecteEquip2.push(totalVotsEquip2[i] === 0 ? 0 : votsEquip2[i][indexRespostesCorrectes[i]] / totalVotsEquip2[i]);
  }

  let equipAcertat = [];
  for (let i = 0; i < sala.preguntaActual.length; i++) {
    if (percentatgeCorrecteEquip1[i] > percentatgeCorrecteEquip2[i]) {
      equipAcertat[i] = 1
    } else if (percentatgeCorrecteEquip2[i] > percentatgeCorrecteEquip1[i]) {
      equipAcertat[i] = 2
    } else if (percentatgeCorrecteEquip1[i] === 0 && percentatgeCorrecteEquip2[i] === 0) {
      equipAcertat[i] = sala.equipAtacant == 1 ? 2 : 1
    } else {
      equipAcertat[i] = sala.equipAtacant
    }
  }

  return { votsEquip1, votsEquip2, equipAcertat, indexRespostesCorrectes }
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
    return vot == 0 || vot == 1 || vot == 2 || vot == 3;
  }
  return vot == 1 || vot == 2 || vot == 3;
}

function totsHanVotat(sala, sonVotsRespostes) {
  // Si els vots són de les respostes, tots han de votar. Sino, només un equip ha de votar
  if (sonVotsRespostes) {
    return sala.totalVots === ((sala.equips[0].nJugadors) + (sala.equips[1].nJugadors))
  }
  return sala.totalVots === (sala.equipAtacant === 1 ? sala.equips[0].nJugadors : sala.equips[1].nJugadors);
}

function natejarSala(sala) {
  sala.jugadors = []
  sala.equips = [
    { nJugadors: 0, punts: 0 },
    { nJugadors: 0, punts: 0 }
  ]
  sala.rondes = []
  sala.totalVots = 0,
    sala.equipAtacant = 0,
    sala.preguntaActual = [],
    sala.resultatsActuals = null,
    sala.jugadorsBanqueta = [],
    sala.jugadorsCamp = [],
    sala.preguntesAnteriors = [],
    sala.outs = 0,
    sala.preguntesAnteriors = []
}

function resetejarTorn(sala) {
  sala.jugadors.forEach(jugador => {
    jugador.baseActual = 0
  })

  sala.outs = 0;
  sala.jugadorsCamp = [];
  sala.jugadorsBanqueta = [];
  emplenarJugadorsBanqueta(sala)
  nouJugadorAlCamp(sala);

  io.to(sala.nomSala).emit('resetejar-torn', sala)
}

function resetejarVotacions(sala) {
  sala.jugadors.forEach(jugador => {
    jugador.votacioBase = null
    jugador.votacioResposta = null
  });
  sala.totalVots = 0;
}

function emplenarJugadorsBanqueta(sala) {
  for (let i = 0; i < JUGADORS_PER_EQUIP; i++) {
    let jugador = {
      baseActual: null,
      eliminat: false,
      id: i
    }
    sala.jugadorsBanqueta.push(jugador);
  }
}

function nouJugadorAlCamp(sala) {
  let jugadorBatejant = sala.jugadorsBanqueta.shift(); // Treiem el primer jugador de l'array banqueta
  jugadorBatejant.baseActual = 0;
  sala.jugadorsCamp.push(jugadorBatejant); // I el col·loquem al camp
}

function comprovarTotesPreguntesRespostes(resposta) {
  return resposta == -1;
}

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});