import { io } from "socket.io-client";
import { useAppStore } from "./stores/app";
import { pushScopeId } from "vue";

const URL = "http://localhost:3000";

export const socket = io(URL);

socket.on("connect", () => {
  console.log("connected");

  socket.on("salaSeleccionada", (msg) => {
    console.log("From socket.js: sala seleccionada " + msg);
    //router.push("/sala");
  });
});





socket.on("disconnect", () => {
  console.log("disconnected");
});