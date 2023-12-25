import { createHashRouter, redirect } from "react-router-dom";
import { EnterNameScreen } from "./screens/EnterNameScreen";
import { LoadingScreen } from "./screens/LoadingScreen";
import { CreateOrJoinScreen } from "./screens/CreateOrJoinScreen";
import { WaitingForOpponentScreen } from "./screens/WaitingForOpponentScreen";
import { JoinGameScreen } from "./screens/JoinGameScreen";
import { EnterSecretScreen } from "./screens/EnterSecretScreen";
import { MainGameScreen } from "./screens/MainGameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { ConnectionErrorScreen } from "./screens/ConnectionErrorScreen";
import { HelpScreen } from "./screens/HelpScreen";

export const ROUTES = {
  ROOT: "/",
  LOADING: "/loading",
  MENU: "/menu",
  HELP: "/help",
  CREATE: "/create",
  JOIN: "/join",
  ENTER_SECRET: "/start",
  GAME: "/game",
  RESULT: "/result",
  CONNECTION_ERROR: "/error",
};

export const router = createHashRouter([
  {
    path: ROUTES.ROOT,
    loader: () => redirect(ROUTES.MENU),
    // element: <EnterNameScreen />,
  },
  {
    path: ROUTES.HELP,
    element: <HelpScreen />,
  },
  {
    path: ROUTES.LOADING,
    element: <LoadingScreen />,
  },
  {
    path: ROUTES.MENU,
    element: <CreateOrJoinScreen />,
  },
  {
    path: ROUTES.CREATE,
    element: <WaitingForOpponentScreen />,
  },
  {
    path: ROUTES.JOIN,
    element: <JoinGameScreen />,
  },
  {
    path: ROUTES.ENTER_SECRET,
    element: <EnterSecretScreen />,
  },
  {
    path: ROUTES.GAME,
    element: <MainGameScreen />,
  },
  {
    path: ROUTES.RESULT,
    element: <ResultScreen />,
  },
  {
    path: ROUTES.CONNECTION_ERROR,
    element: <ConnectionErrorScreen />,
  },
]);
