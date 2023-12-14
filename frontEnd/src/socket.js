import { io } from "socket.io-client";
import { useAppStore } from "./stores/app";
import router from "./router";

let url = "http://" + window.location.hostname + ":3378";
// if(window.location.hostname === 'tr2g4.daw.inspedralbes.cat') {
//   url = "http://tr2g4.daw.inspedralbes.cat:3378";
// } else if(window.location.hostname === 'mathball.daw.inspedralbes.cat') {
//   url = "http://mathball.daw.inspedralbes.cat:3378";
// } else {
//   url = "http://localhost:3378";
// }

export const socket = io(url);

socket.on("connect", () => {
  const pinia = useAppStore();
  console.log("connected");

  socket.on("sala-seleccionada", (msg) => {
    console.log("From socket.js: sala seleccionada ", msg);
    pinia.setSalaInfo(msg);
    router.push("/sala");
  });

  socket.on('equips-actualitzats', (id, sala) => {
    // Handle the 'equips-actualitzats' event here
    pinia.setSalaInfo(id, sala)
    console.log('Received equips-actualitzats:', id, sala);
  });

  socket.on('partida-iniciada', (sala) => {
    // Handle the 'partida-iniciada' event here
    pinia.setTorn(0);
    pinia.setSalaInfo(null, sala);
    router.push("/partida");
    console.log('Received partida-iniciada:', sala);
  });

  socket.on('començar-votacio-dificultat', (data) => {
    // Handle the 'començar-votacio' event here
    pinia.setVotacioBaseEnCurs(true);
    pinia.setTemporitzador(data.cronometre);
    console.log('Received començar-votacio-dificultat:', data);
  });

  socket.on('actualitzar-comptador', (cronometre) => {
    pinia.setTemporitzador(cronometre);
    console.log('Received actualitzar-comptador:', cronometre);
  });

  socket.on('finalitzar-votacio-dificultat', (dificultat) => {
    // Handle the 'finalitzar-votacio' event here
    let dificultatSeleccionada = {
      isSelected_1: false,
      isSelected_2: false,
      isSelected_3: false,
    };

    pinia.setVotacioBaseEnCurs(false);
    pinia.setDificultatSeleccionada(dificultatSeleccionada);
    pinia.setVotacioPreguntaEnCurs(true);
    router.push("/pregunta");
    console.log('Received finalitzar-votacio:', dificultat);
  });

  socket.on('votacions-bases-final', async (indexSala, vot) => {
    // Handle the 'votacions-bases-final' event here
    pinia.setBase(vot);
    console.log('Received votacions-bases-final:', indexSala, vot);
  });

  socket.on('nova-pregunta', (pregunta) => {
    // Handle the 'nova-pregunta' event here
    pinia.setPreguntaActual(pregunta);
    console.log('Received nova-pregunta:', pregunta);
  });

  socket.on('finalitzar-votacions-respostes', async (resultats) => {
    // Handle the 'votacions-bases-final' event here
    pinia.setVotacioPreguntaEnCurs(false);
    pinia.setResultatsActuals(resultats);
    router.push("/resultats");
    console.log('Received finalitzar-votacions-respostes:', resultats);
  });
  
  socket.on('total-votacions', (votacions, totalJugadors) => {
    // Handle the 'total-votacions' event here
    pinia.setTotalVotacions(votacions);
    pinia.setTotalJugadors(totalJugadors);
    console.log('Received total-votacions:', votacions, totalJugadors);
  });

  socket.on('vot-dificultat', (totalVots) => {
    pinia.setTotalVots(totalVots);
    console.log('Received vot-dificultat:', totalVots);
  });

  socket.on('vot-resposta', (totalVots, res) => {
    pinia.setTotalVots(totalVots);
    pinia.setRespostaCorrecta(res);
    console.log('Received vot-resposta:', totalVots);
  });

  socket.on('sumar-punt', (sala) => {
    /*let puntuacioEquip1 = sala.equips[0].punts;
    let puntuacioEquip2 = sala.equips[1].punts;
    let puntuacio = {equip1: puntuacioEquip1, equip2: puntuacioEquip2}
    pinia.setPuntuacio(puntuacio);*/
    pinia.setSalaInfo(null, sala);
    console.log('Received sumar-punt:', sala);
  });

  socket.on('jugador-eliminat', (sala, jugador) => {
    pinia.setSalaInfo(null, sala);
    pinia.setJugadorEnCamp(jugador);
    console.log('Received jugador-eliminat:', sala, jugador);
  });

  socket.on('canvi-equip', (equipAtacant) => {
    pinia.setEquipAtacant(equipAtacant)
    console.log('Received canvi-equip:', equipAtacant);
  });

  socket.on('tornar-taulell', () => {
    pinia.setTornarTaulell(true);
    router.push("/partida");
    console.log('Received tornar-taulell:');
  });

  socket.on('moure-jugador', (sala, jugador) => {
    pinia.setSalaInfo(null, sala);
    pinia.setJugadorEnCamp(jugador);
    console.log('Received moure-jugador:', sala, jugador);
  });

  socket.on('finalitzar-partida', () => {
    router.push("/resultatsFinals");
    console.log('Received finalitzar-partida:');
  });

  socket.on('resetejar-torn', (sala) => {
    pinia.setSalaInfo(null, sala);
    console.log('Received resetejar-torn:');
  });

});

socket.on("disconnect", () => {
  console.log("disconnected");
});