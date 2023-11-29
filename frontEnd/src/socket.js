import { io } from "socket.io-client";
import { useAppStore } from "./stores/app";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
});






socket.on("disconnect", () => {
  console.log("disconnected");
});