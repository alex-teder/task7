import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { Room, Player } from "./types";
import { allCharsNumeric, allCharsUnique, generateId } from "./utils";
import { initGame } from "./game";

const app = express();
app.use(cors());
app.use(express.static("../client/dist/"));
const PORT = 3333;
const server = app.listen(PORT, () => {
  console.clear();
  console.log("App is listening on port", PORT);
});
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms: Record<string, Room> = {};

io.on("connection", (socket: Player) => {
  console.log("user connected!");

  socket.on("setName", () => {});

  socket.on("createGame", () => {
    const roomEntries = Object.entries(rooms).filter(([key, value]) => value.player1 === socket);
    for (const [id] of roomEntries) {
      delete rooms[id];
    }
    const room: Room = { id: generateId(), player1: socket, cleanupFn: () => {} };
    rooms[room.id] = room;
    socket.emit("roomId", room.id);
  });

  socket.on("cancelCreateGame", () => {
    const roomEntries = Object.entries(rooms).filter(([key, value]) => value.player1 === socket);
    if (!roomEntries.length) return;
    for (const [id] of roomEntries) {
      delete rooms[id];
    }
  });

  socket.on("joinGame", (id) => {
    const room = rooms[id];
    if (!room) {
      socket.emit("notFound");
      return;
    }
    if (room.player2) {
      socket.emit("notFound");
      return;
    }
    room.player2 = socket;
    room.player1.emit("gameReady");
    room.player2.emit("gameReady");
  });

  socket.on("setSecret", (secret: string) => {
    if (!allCharsNumeric(secret) || !allCharsUnique(secret) || secret.length !== 4) {
      socket.emit("notFound");
      return;
    }
    const roomEntry = Object.entries(rooms).find(
      ([key, value]) => value.player1 === socket || value.player2 === socket
    );
    if (!roomEntry) return;
    const room = roomEntry[1];
    if (socket === room.player1) {
      room.secret1 = secret;
    } else {
      room.secret2 = secret;
    }
    if (room.secret1 && room.secret2) {
      room.cleanupFn = initGame(room);
      room.player1.emit("start");
      room.player2!.emit("start");
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("user left:", reason);
    const roomEntries = Object.entries(rooms).filter(
      ([key, value]) => value.player1 === socket || value.player2 === socket
    );
    if (!roomEntries.length) return;
    for (const [id] of roomEntries) {
      rooms[id].player1.emit("connectionError");
      rooms[id].player2 && rooms[id].player2?.emit("connectionError");
      rooms[id].cleanupFn();
      delete rooms[id];
    }
  });

  socket.on("finishedPlaying", () => {
    const roomEntries = Object.entries(rooms).filter(
      ([key, value]) => value.player1 === socket || value.player2 === socket
    );
    if (!roomEntries.length) return;
    for (const [id] of roomEntries) {
      rooms[id].cleanupFn();
      delete rooms[id];
    }
  });
});
