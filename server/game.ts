import { Player, Room, GuessResponse } from "./types";
import { allCharsNumeric, allCharsUnique } from "./utils";

export function initGame(room: Room) {
  const { player1, player2, secret1, secret2 } = room;
  if (!player2 || !secret1 || !secret2) throw new Error();
  const secretLength = room.mode === "long" ? 4 : 3;
  const player1Moves: GuessResponse[] = [];
  const player2Moves: GuessResponse[] = [];
  let currentPlayer: Player = player1;

  const switchPlayers = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const handleFinish = (winner: Player) => {
    setTimeout(() => {
      if (winner === player1) {
        player1.emit("game:youWin");
        player2.emit("game:youLose");
      } else {
        player2.emit("game:youWin");
        player1.emit("game:youLose");
      }
    }, 500);
  };

  const handleMove = (attempt: string) => {
    if (attempt.length !== secretLength || !allCharsNumeric(attempt) || !allCharsUnique(attempt)) {
      return currentPlayer.emit("notFound");
    }

    let result;
    if (currentPlayer === player1) {
      result = checkAttempt(attempt, secret2);
      player1Moves.push(result);
    } else {
      result = checkAttempt(attempt, secret1);
      player2Moves.push(result);
    }
    player1.emit("game:yourMoves", player1Moves);
    player2.emit("game:yourMoves", player2Moves);
    player1.emit("game:opponentMoves", player2Moves);
    player2.emit("game:opponentMoves", player1Moves);

    if (result.bulls === secretLength) {
      return handleFinish(currentPlayer);
    }

    currentPlayer.emit("game:opponentTurn");
    switchPlayers();
    currentPlayer.emit("game:yourTurn");
  };

  setTimeout(() => {
    player1.emit("yourSecret", secret1);
    player2.emit("yourSecret", secret2);
    player1.emit("game:yourTurn");
    player2.emit("game:opponentTurn");
  }, 750);

  player1.on("game:submitMove", handleMove);
  player2.on("game:submitMove", handleMove);

  return () => {
    player1.off("game:submitMove", handleMove);
    player2.off("game:submitMove", handleMove);
  };
}

function checkAttempt(attempt: string, secret: string): GuessResponse {
  const result = { bulls: 0, cows: 0 };

  for (let i = 0; i < attempt.length; i++) {
    if (attempt[i] === secret[i]) {
      result.bulls++;
    } else if (secret.includes(attempt[i])) {
      result.cows++;
    }
  }

  return { ...result, guess: attempt };
}
