const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io'); // npm install socket.io --> That will install the module and add the dependency to package.json
const cors = require('cors');
import { getPregunta } from './communicationManager';

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
  categoria: 1
}]

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
    sales[indexSala].jugadors.forEach(jugador => {
      if (jugador.id === socket.id) {
        return;
      }
    });

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
      votacioBase: null
    })

    socket.emit('equips-actualitzats', sales[indexSala].jugadors)
  })

  // Admin comença la partida
  socket.on('partida-iniciada', (indexSala) => {
    const equipVotant = Math.floor(Math.random() * 2) + 1; // 1 o 2
    sales[indexSala].equipVotant = equipVotant
    socket.emit('partida-iniciada', equipVotant)
  })

  // Rebre votacions de les bases d'usuaris
  socket.on('votacio-base', async (indexSala, vot) => {
    if (!esVotValid(vot)) return;

    let sala = sales[indexSala];
    let jugador = sala.jugadors.find(j => j.id === socket.id);

    if (jugador && !jugador.votacioBase) {
      jugador.votacioBase = vot;
      sala.votacions++;
    }

    if (totsHanVotat(sala)) {
      let baseMesVotada = calcularBaseMesVotada(sala);
      socket.emit('votacions-bases-final', baseMesVotada);
      resetejarVotacions(sala);

      try {
        let pregunta = await getPregunta(baseMesVotada, sala.categoria, []);
        socket.emit('nova-pregunta', pregunta);
      } catch (error) {
        console.error('Error en obtenir la pregunta:', error);
      }
    }
  })



});

function calcularBaseMesVotada(sala) {
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

function esVotValid(vot) {
  return vot === 1 || vot === 2 || vot === 3;
}

function totsHanVotat(sala) {
  return sala.votacions === (sala.equipVotant === 1 ? sala.jugadorsEquip1 : sala.jugadorsEquip2);
}

function resetejarVotacions(sala) {
  sala.jugadors.forEach(jugador => jugador.votacioBase = null);
}

server.listen(port, () => { // We make the http server listen on port 3000.
  console.log('server running at http://localhost:3000');
});

