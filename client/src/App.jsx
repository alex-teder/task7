import { Canvas } from "@react-three/fiber";
import { Pasture } from "./components/Pasture";
import { MainTextPanel } from "./components/MainTextPanel";
import { SocketProvider } from "./SocketProvider";
import { AnimalsProvider } from "./AnimalProvider";

function App() {
  return (
    <SocketProvider>
      <AnimalsProvider>
        <Canvas shadows camera={{ position: [36, 36, 36], fov: 27 }}>
          <color attach="background" args={["#ececec"]} />
          <Pasture />
        </Canvas>
      </AnimalsProvider>
      <MainTextPanel />
    </SocketProvider>
  );
}

export default App;
