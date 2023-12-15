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
    origin: ["http://mathball.daw.inspedralbes.cat","http://tr2g4.daw.inspedralbes.cat","http://localhost:5173", "http://127.0.0.1:5173"], 
    methods: ["GET", "POST"]
  }
});
const port = 3378

const sales = [{
  jugadors: [],
  equips: [
    { nJugadors: 0, punts: 0 },
    { nJugadors: 0, punts: 0 }
  ],
  rondes: [],
  totalVots: 0,
  equipAtacant: 0,
  categoria: 1,
  preguntaActual: [],
  resultatsActuals: null,
  nomSala: "Sala 1",
  jugadorsTots: [],
  jugadorsBanqueta: [],
  jugadorsCamp: [],
  outs: 0
}];

const JUGADORS_PER_EQUIP = 5;
for (let i = 0; i < JUGADORS_PER_EQUIP; i++) {
  let jugador = {
    baseActual: null,
    eliminat: false,
    id: i
  }
  sales[0].jugadorsBanqueta.push(jugador);
}

// Executar funcio per a crear 10 sales
(function () {
  for (let i = 0; i < 10; i++) {
    let sala = {
      jugadors: [],
      equips: [
        { nJugadors: 0, punts: 0 },
        { nJugadors: 0, punts: 0 }
      ],
      rondes: [],
      totalVots: 0,
      equipAtacant: 0,
      categoria: 1,
      preguntaActual: [],
      resultatsActuals: null,
      nomSala: "Sala " + (i + 1),
      jugadorsBanqueta: [],
      jugadorsCamp: []
    }
    sales.push(sala)
  }
})()

const OUTS_ELIMINAR = 2;
const CARRERES_GUANYAR = 3;

const TEMPS_ESCOLLIR_BASE = 10;
const TEMPS_VOTAR_RESPOSTA = 99;
const socketRooms = {};
let cronometre;
let intervalId;

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
      let jugador = sales.find(s => s.nomSala === room).jugadors.find(j => j.id === socket.id);
      if (jugador) {
        let indexSala = sales.findIndex(s => s.nomSala === room)
        let indexJugador = sales[indexSala].jugadors.findIndex(j => j.id === socket.id)
        sales[indexSala].jugadors.splice(indexJugador, 1)
        sales[indexSala].equips[jugador.equip - 1].nJugadors--;
        io.emit('equips-actualitzats', indexSala, sales[indexSala]);
      }
    }
  });

  socket.on('crear-sala', (Sala) => {
    // Comprovar si ja existeix una sala amb el mateix nom
    if (sales.find(s => s.nomSala === Sala.nom)) {
      socket.emit('sala-creada', false);
      return;
    }

    // Crear nova sala
    let sala = {
      jugadors: [],
      equips: [
        { nJugadors: 0, punts: 0 },
        { nJugadors: 0, punts: 0 }
      ],
      rondes: [],
      totalVots: 0,
      equipAtacant: 0,
      categoria: Sala.categoria,
      preguntaActual: null,
      resultatsActuals: null,
      nomSala: Sala.nom
    }
    sales.push(sala);
    socket.emit('sala-creada', true);
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
        eliminat: false
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
    nouJugadorAlCamp(sala);
    io.to(sala.nomSala).emit('partida-iniciada', sala)
  })

  //Iniciar procés de votació
  socket.on('començar-votacio-dificultat', (indexSala) => {
    cronometre = TEMPS_ESCOLLIR_BASE;
    let sala = sales[indexSala];
    io.to(sala.nomSala).emit('començar-votacio-dificultat', cronometre);

    // Decrementem el cronòmetre cada segon i actualitzem a tots els clients
    intervalId = setInterval(async () => {
      cronometre -= 1;
      io.to(sala.nomSala).emit('actualitzar-comptador', cronometre);

      // Quan el cronòmetre arriba a zero, el detenim i el resetegem i finalitzem el procés de votació
      if (cronometre === 0) {
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
    await novaPregunta(sala, dificultatVotada, sala.categoria, [])
  }

  async function novaPregunta(sala, dificultat, categoria, preguntesAnteriors) {
    // Trucar la API de Laravel per demanar la pregunta
    try {
      sala.preguntaActual = [];
      for (let i = 0; i < sala.jugadorsCamp.length; i++) {
        let pregunta = await getPregunta(dificultat, categoria, preguntesAnteriors);
        pregunta.jugadorId = sala.jugadorsCamp[i].id;
        sala.preguntaActual.push(pregunta);
      }
      io.to(sala.nomSala).emit('nova-pregunta', sala.preguntaActual);
    } catch (error) {
      console.error('Error en obtenir la pregunta:', error);
      return;
    }

    // Creem el temporitzador i actualitzem cada segon per a notificar els clients
    cronometre = TEMPS_VOTAR_RESPOSTA;
    intervalId = setInterval(async () => {
      cronometre -= 1;
      io.to(sala.nomSala).emit('actualitzar-comptador', cronometre);

      if (cronometre === 0) {
        finalitzarVotacionsRespostes(sala)
      }
    }, 1000);
  }

  socket.on('vot-resposta', (indexSala, vot) => {
    // Vot ha de ser del 0 al 3
    //if (!esVotValid(vot, true)) return;
    let sala = sales[indexSala];
    let jugador = sala.jugadors.find(j => j.id === socket.id);

    //if (jugador && !jugador.votacioResposta) { //SEGURETAT QUE JA VEUREM COM ARREGLEM
    if (jugador) {
      jugador.votacioResposta = vot;
      sala.totalVots++;
      io.to(sala.nomSala).emit('vot-resposta', sala.totalVots, sala.preguntaActual.indexRespostaCorrecta)
    }

    if (totsHanVotat(sala, true)) {
      finalitzarVotacionsRespostes(sala)
    }
  })

  function finalitzarVotacionsRespostes(sala) {
    clearInterval(intervalId);
    const resultats = calcularResultatsRespostes(sala)
    sala.resultatsActuals = resultats
    resetejarVotacions(sala)
    io.to(sala.nomSala).emit('finalitzar-votacions-respostes', resultats)
  }

  socket.on('tornar-taulell', (indexSala) => {
    let sala = sales[indexSala]
    io.to(sala.nomSala).emit('tornar-taulell');

    // Per cada pregunta...
    for (let i = 0; i < sala.resultatsActuals.equipAcertat.length; i++) {
      if (sala.equipAtacant === sala.resultatsActuals.equipAcertat[i]) {
        // Si l'equip atacant ha acertat la pregunta, el jugador associat a la pregunta avança bases,
        let jugador = moureJugador(sala, sala.preguntaActual[i].dificultat, sala.preguntaActual[i].jugadorId, false);
      } else {
        // Si l'equip atacant ha fallat la pregunta, el jugador associat a la pregunta és eliminat...
        let jugador = moureJugador(sala, sala.preguntaActual[i].dificultat, sala.preguntaActual[i].jugadorId, true);
        // ...i sumem un out
        sala.outs++;
      }
    }

    // Comprovem quins jugadors han arribat a la base casa
    let banqueta = sala.jugadorsCamp.filter(checkBaseHome);
    // Comprovem quins jugadors encara no han arribat a la base casa
    let camp = sala.jugadorsCamp.filter(checkContinuaJugant);

    // Sumem tants punts com jugadors han arribat a la base casa
    let indexAtacant = sala.equipAtacant === 1 ? 0 : 1;
    if (banqueta.length > 0) {
      sala.equips[indexAtacant].punts += banqueta.length;
      sala.rondes[sala.rondes.length - 1].punts += banqueta.length;
      io.to(sala.nomSala).emit('sumar-punt', sala);
    }

    // Afegim els jugadors que han arribat a la base casa a la banqueta
    sala.jugadorsBanqueta.push(...banqueta);

    // Actualitzem els jugadors que queden al camp
    sala.jugadorsCamp = camp;

    // Si hi ha n outs o no hi ha ningú per batejar es canvia d'equip; si hi ha algún jugador a la banqueta salta al camp a batejar
    if (sala.outs === OUTS_ELIMINAR || sala.jugadorsBanqueta.length === 0) {
      console.log("ENTRO CONDICIÓN")
      canviarEquips(sala);
    } else {
      nouJugadorAlCamp(sala);
      io.to(sala.nomSala).emit('moure-jugador', sala, null)
    }

    //Si un equip fa n carreres guanya el joc
    if (sala.equips[indexAtacant].punts === CARRERES_GUANYAR) {
      io.to(sala.nomSala).emit('finalitzar-partida');
    }

  })

  function moureJugador(sala, moviments, jugadorId, isEliminat) {
    let jugador = sala.jugadors.find(j => j.equip === sala.equipAtacant)
    jugador.baseActual += moviments

    for (let i = 0; i < sala.jugadorsCamp.length; i++) {
      if (sala.jugadorsCamp[i].id === jugadorId) {
        if (!isEliminat) {
          sala.jugadorsCamp[i].baseActual += moviments;
        } else {
          sala.jugadorsCamp.splice(i, 1);
        }
      }
    }

    io.to(sala.nomSala).emit('moure-jugador', sala, jugador)
    return jugador
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
      if (jugador.votacioResposta != -1) {
        //console.log("----VOT JUGADOR---- " + jugador.votacioResposta )
        if (jugador.equip === 1) {
          votsEquip1[i][jugador.votacioResposta[i]]++;
        } else if (jugador.equip === 2) {
          votsEquip2[i][jugador.votacioResposta[i]]++;
        }
      }
    });
  }

  /*console.log("ARRAY VOTACIONS")
  console.log(votsEquip1);
  console.log(votsEquip2);*/

  // Calcular total de vots per equip i percentatge d'encerts
  const totalVotsEquip1 = [];
  const totalVotsEquip2 = [];
  for (let i = 0; i < sala.preguntaActual.length; i++) {
    totalVotsEquip1.push(votsEquip1[i].reduce((acc, cur) => acc + cur, 0))
    totalVotsEquip2.push(votsEquip2[i].reduce((acc, cur) => acc + cur, 0))
  }

  /*console.log("TOTAL VOTS EQUIPS")
  console.log(totalVotsEquip1);
  console.log(totalVotsEquip2);*/

  const percentatgeCorrecteEquip1 = [];
  const percentatgeCorrecteEquip2 = [];
  for (let i = 0; i < sala.preguntaActual.length; i++) {
    percentatgeCorrecteEquip1.push(totalVotsEquip1[i] === 0 ? 0 : votsEquip1[i][indexRespostesCorrectes[i]] / totalVotsEquip1[i]);
    percentatgeCorrecteEquip2.push(totalVotsEquip2[i] === 0 ? 0 : votsEquip2[i][indexRespostesCorrectes[i]] / totalVotsEquip2[i]);
  }

  /*console.log("PERCENTATGES EQUIPS")
  console.log(percentatgeCorrecteEquip1);
  console.log(percentatgeCorrecteEquip2);*/

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
    return vot == 0 || vot == 1 || vot == 2 || vot == 3;
  }
  return vot == 1 || vot == 2 || vot == 3;
}

function totsHanVotat(sala, sonVotsRespostes) {
  // Si els vots són de les respostes, tots han de votar. Sino, només un equip ha de votar
  if (sonVotsRespostes) {
    return sala.totalVots === ((sala.equips[0].nJugadors * sala.jugadorsCamp.length) + (sala.equips[1].nJugadors * sala.jugadorsCamp.length))
  }
  return sala.totalVots === (sala.equipAtacant === 1 ? sala.equips[0].nJugadors : sala.equips[1].nJugadors);
}

function resetejarTorn(sala) {
  sala.jugadors.forEach(jugador => {
    jugador.baseActual = 0
    jugador.eliminat = false
  })

  sala.outs = 0;
  sala.jugadorsCamp = [];
  sala.jugadorsBanqueta = [];
  for (let i = 0; i < JUGADORS_PER_EQUIP; i++) {
    let jugador = {
      baseActual: null,
      eliminat: false,
      id: i
    }
    sales[0].jugadorsBanqueta.push(jugador);
  }
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

function nouJugadorAlCamp(sala) {
  let jugadorBatejant = sala.jugadorsBanqueta.shift(); // Treiem el primer jugador de l'array banqueta
  jugadorBatejant.baseActual = 0;
  sala.jugadorsCamp.push(jugadorBatejant); // I el col·loquem al camp
}

function checkBaseHome(jugador) {
  return jugador.baseActual > 3;
}

function checkContinuaJugant(jugador) {
  return jugador.baseActual <= 3;
}

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});