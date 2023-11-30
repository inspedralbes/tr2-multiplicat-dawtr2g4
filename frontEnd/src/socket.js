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

  socket.on('partida-iniciada', (equipVotant) => {
    // Handle the 'partida-iniciada' event here
    pinia.setTorn(equipVotant);
    console.log('Received partida-iniciada:', equipVotant);
  });

  socket.on('començar-votacio-dificultat', (data) => {
    // Handle the 'començar-votacio' event here
    pinia.setVotacioEnCurs(true);
    pinia.setTemporitzador(data.cronometre);
    console.log('Received començar-votacio-dificultat:', data);
  });

  socket.on('actualitzar-comptador', (cronometre) => {
    pinia.setTemporitzador(cronometre);
    console.log('Received actualitzar-comptador:', cronometre);
  });

  socket.on('finalitzar-votacio', (isVotacioEnCurs) => {
    // Handle the 'finalitzar-votacio' event here
    pinia.setVotacioEnCurs(isVotacioEnCurs);
    console.log('Received finalitzar-votacio:', isVotacioEnCurs);
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

});

socket.on("disconnect", () => {
  console.log("disconnected");
});