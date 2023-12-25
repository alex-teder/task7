import { Socket } from "socket.io";

export interface Player extends Socket {}

export interface Room {
  id: string;
  player1: Player;
  secret1?: string;
  player2?: Player;
  secret2?: string;
  cleanupFn: () => void;
}

export interface GuessResponse {
  guess: string;
  bulls: number;
  cows: number;
}
