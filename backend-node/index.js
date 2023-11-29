const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io'); // npm install socket.io --> That will install the module and add the dependency to package.json

const app = express();
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
}]

app.get('/api/salas', (req, res) => {
  res.json({sales: sales})
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
  socket.on('votacio-base', (indexSala, vot) => {
    // Comprovar votació de la base és 1, 2 o 3
    if (vot !== 1 && vot !== 2 && vot !== 3) return

    sales[indexSala].jugadors.forEach(jugador => {
      if (jugador.id === socket.id && jugador.votacioBase) {
        // Si el jugador ja ha votat, no fagis res
        return
      } else if (jugador.id === socket.id) {
        // Si el jugador no ha votat, guarda el vot
        jugador.votacioBase = vot
        sales[indexSala].votacions++
      }
    })

    // Recompte si tots els jugadors han votat
    if (sales[indexSala].votacions === (sales[indexSala].equipVotant === 1 ? sales[indexSala].jugadorsEquip1 : sales[indexSala].jugadorsEquip2)) {
      // Calcular les bases més votades i comunicar als clients
      let vots = []
      sales[indexSala].jugadors.forEach(jugador => {
        if (jugador.equip === equipVotant && jugador.votacioBase) {
          vots.push(jugador.votacioBase)
        }
      })
      let baseMesVotada = recompteVots(vots)
      socket.emit('votacions-bases-final', baseMesVotada)

      // Resetejar els valors de les votacions a null
      sales[indexSala].jugadors.forEach(jugador => {
        jugador.votacioBase = null
      })
    }
  })



});

function recompteVots(vots) {
  let voteCount = { 1: 0, 2: 0, 3: 0 };

  vots.forEach(vot => {
    voteCount[vot]++;
  });

  let maxVotes = Math.max(voteCount[1], voteCount[2], voteCount[3]);
  let opcioMesVotada = Object.keys(voteCount).filter(vot => voteCount[vot] === maxVotes);
  // Si hi ha empat en les votacions, es retorna la base més baixa
  return opcioMesVotada[0]
}

server.listen(port, () => { // We make the http server listen on port 3000.
  console.log('server running at http://localhost:3000');
});

