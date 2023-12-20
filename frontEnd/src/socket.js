import { io } from "socket.io-client";
import { useAppStore } from "./stores/app";
import router from "./router";

let url = "http://" + window.location.hostname + ":3379";

export const socket = io(url);

socket.on("connect", () => {
  const pinia = useAppStore();

  socket.on("sala-creada", (sala) => {
    pinia.addSala(sala)
  })

  socket.on("sala-seleccionada", (msg) => {
    pinia.setSalaInfo(msg);
    router.push("/sala");
  });

  socket.on('equips-actualitzats', (id, sala) => {
    // Handle the 'equips-actualitzats' event here
    pinia.setSalaInfo(id, sala)
  });

  socket.on('partida-iniciada', (sala) => {
    // Handle the 'partida-iniciada' event here
    pinia.setTorn(0);
    pinia.setSalaInfo(null, sala);
    router.push("/partida");
  });

  socket.on('començar-votacio-dificultat', (data) => {
    // Handle the 'començar-votacio' event here
    pinia.setVotacioBaseEnCurs(true);
    pinia.setTemporitzador(data.cronometre);
  });

  socket.on('actualitzar-comptador', (cronometre) => {
    pinia.setTemporitzador(cronometre);
  });

  socket.on('finalitzar-votacio-dificultat', (dificultat, numPreguntes) => {
    // Handle the 'finalitzar-votacio' event here
    let dificultatSeleccionada = {
      isSelected_1: false,
      isSelected_2: false,
      isSelected_3: false,
    };

    let isPreguntaResposta = [];
    for (let i = 0; i < numPreguntes; i++) {
      isPreguntaResposta.push(-1);
    }

    pinia.setVotacioBaseEnCurs(false);
    pinia.setDificultatSeleccionada(dificultatSeleccionada);
    pinia.setIsPreguntaResposta(isPreguntaResposta);
    pinia.setVotacioPreguntaEnCurs(true);
    router.push("/pregunta");
  });

  socket.on('votacions-bases-final', async (indexSala, vot) => {
    // Handle the 'votacions-bases-final' event here
    pinia.setBase(vot);
  });

  socket.on('nova-pregunta', (pregunta) => {
    // Handle the 'nova-pregunta' event here
    pinia.setPreguntaActual(pregunta);
  });

  socket.on('finalitzar-votacions-respostes', async (resultats, respostesCorrectes) => {
    // Handle the 'votacions-bases-final' event here
    pinia.setVotacioPreguntaEnCurs(false);
    pinia.setRespostaCorrecta(respostesCorrectes);
    pinia.setResultatsActuals(resultats);
    router.push("/resultats");
  });
  
  socket.on('total-votacions', (votacions, totalJugadors) => {
    // Handle the 'total-votacions' event here
    pinia.setTotalVotacions(votacions);
    pinia.setTotalJugadors(totalJugadors);
  });

  socket.on('vot-dificultat', (totalVots) => {
    pinia.setTotalVots(totalVots);
  });

  socket.on('vot-resposta', (totalVots) => {
    pinia.setTotalVots(totalVots);
    router.push("/totalVotacions");
  });

  socket.on('jugador-eliminat', (sala) => {
    pinia.setSalaInfo(null, sala);
  });

  socket.on('canvi-equip', (equipAtacant) => {
    pinia.setEquipAtacant(equipAtacant)
  });

  socket.on('tornar-taulell', () => {
    pinia.setTornarTaulell(true);
    router.push("/partida");
  });

  socket.on('moure-jugador', (sala) => {
    pinia.setSalaInfo(null, sala);
  });

  socket.on('finalitzar-partida', () => {
    router.push("/resultatsFinals");
  });

  socket.on('resetejar-torn', (sala) => {
    pinia.setSalaInfo(null, sala);
  });

});

socket.on("disconnect", () => {
});