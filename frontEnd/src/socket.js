import { io } from "socket.io-client";
import { useAppStore } from "./stores/app";

const socket = io("http://localhost:3000");
const pinia = useAppStore();

socket.on("connect", (socket) => {
  console.log("connected");

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

  socket.on('començar-votacio', (data) => {
    // Handle the 'començar-votacio' event here
    pinia.setVotacioEnCurs(data.isVotacioEnCurs);
    pinia.setTemporitzador(data.cronometre);
    console.log('Received començar-votacio:', data);
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

  socket.on('seleccionar base', (msg) => {
    // Handle the 'seleccionar base' event here
    console.log('Received seleccionar base:', msg);
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