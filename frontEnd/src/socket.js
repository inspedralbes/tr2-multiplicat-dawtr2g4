import { io } from "socket.io-client";
import { useAppStore } from "./stores/app";
import { pushScopeId } from "vue";
import router from "./router";

const URL = "http://localhost:3000";

export const socket = io(URL);

socket.on("connect", () => {
  const pinia = useAppStore();
  console.log("connected");

  socket.on("salaSeleccionada", (msg) => {
    console.log("From socket.js: sala seleccionada " + msg);
    router.push("/sala");
  });

  socket.on('equips-actualitzats', (sales) => {
    // Handle the 'equips-actualitzats' event here
    pinia.setSales(sales);
    console.log('Received equips-actualitzats:', sales);
  });

  socket.on('partida-iniciada', (equipAtacant) => {
    // Handle the 'partida-iniciada' event here
    pinia.setTorn(0);
    pinia.setEquipAtacant(equipAtacant);
    console.log('Received partida-iniciada:', equipAtacant);
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
    pinia.setVotacioBaseEnCurs(false);
    pinia.setVotacioPreguntaEnCurs(true);
    console.log('Received finalitzar-votacio:', dificultat);
  });

  socket.on('votacions-bases-final', async (indexSala, vot) => {
    // Handle the 'votacions-bases-final' event here
    pinia.setBase(vot);
    console.log('Received votacions-bases-final:', indexSala, vot);
  });

  socket.on('nova-pregunta', (pregunta) => {
    // Handle the 'nova-pregunta' event here
    pinia.setPreguntaAct(pregunta);
    console.log('Received nova-pregunta:', pregunta);
  });

  socket.on('finalitzar-votacions-respostes', async (resultats) => {
    // Handle the 'votacions-bases-final' event here
    pinia.setVotacioPreguntaEnCurs(false);
    pinia.setResultatsPreguntaAct(resultats);
    console.log('Received finalitzar-votacions-respostes:', resultats);
  });
  
  socket.on('total-votacions', (votacions, totalJugadors) => {
    // Handle the 'total-votacions' event here
    pinia.setTotalVotacions(votacions);
    pinia.setTotalJugadors(totalJugadors);
    console.log('Received total-votacions:', votacions, totalJugadors);
  });

  socket.on('vot-dificultat', (totalVots) => {
    pinia.setTotalVotacions(totalVots);
    console.log('Received vot-dificultat:', totalVots);
  });

  socket.on('vot-resposta', (totalVots) => {
    pinia.setTotalVotacions(totalVots);
    console.log('Received vot-resposta:', totalVots);
  });

  socket.on('sumar-punt', (sala) => {
    let puntuacioEquip1 = sala.equips[0].punts;
    let puntuacioEquip2 = sala.equips[1].punts;
    let puntuacio = {equip1: puntuacioEquip1, equip2: puntuacioEquip2}
    pinia.setPuntuacio(puntuacio);
    console.log('Received sumar-punt:', sala);
  });

  socket.on('jugador-eliminat', (sala, jugador) => {
    pinia.setJugadorEnCamp(jugador);
    console.log('Received jugador-eliminat:', sala, jugador);
  });

  socket.on('canvi-equip', (equipAtacant) => {
    pinia.setEquipAtacant(equipAtacant)
    console.log('Received canvi-equip:', equipAtacant);
  });

  socket.on('tornar-taulell', () => {
    pinia.setTornarTaulell(true);
    console.log('Received tornar-taulell:');
  });

  socket.on('moure-jugador', (sala, jugador) => {
    pinia.setJugadorEnCamp(jugador);
    console.log('Received moure-jugador:', sala, jugador);
  });

});

socket.on("disconnect", () => {
  console.log("disconnected");
});