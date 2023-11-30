import { io } from "socket.io-client";
import { useAppStore } from "./stores/app";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
});

socket.on('equips-actualitzats', (sales) => {
  // Handle the 'equips-actualitzats' event here
  console.log('Received equips-actualitzats:', sales);
});

socket.on('partida-iniciada', (equipVotant) => {
  // Handle the 'partida-iniciada' event here
  console.log('Received partida-iniciada:', equipVotant);
});

socket.on('començar-votacio', (data) => {
  // Handle the 'començar-votacio' event here
  console.log('Received començar-votacio:', data);
});

socket.on('actualitzar-comptador', (cronometre) => {
  // Handle the 'actualitzar-comptador' event here
  console.log('Received actualitzar-comptador:', cronometre);
});

socket.on('finalitzar-votacio', (isVotacioEnCurs) => {
  // Handle the 'finalitzar-votacio' event here
  console.log('Received finalitzar-votacio:', isVotacioEnCurs);
});

socket.on('votacions-bases-final', async (indexSala, vot) => {
  // Handle the 'votacions-bases-final' event here
  console.log('Received votacions-bases-final:', indexSala, vot);
});

socket.on('seleccionar base', (data) => {
  // Handle the 'seleccionar base' event here
  console.log('Received seleccionar base:', data);
});

socket.on('nova-pregunta', (data) => {
  // Handle the 'nova-pregunta' event here
  console.log('Received nova-pregunta:', data);
});




socket.on("disconnect", () => {
  console.log("disconnected");
});