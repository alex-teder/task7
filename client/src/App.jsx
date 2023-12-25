import { Canvas } from "@react-three/fiber";
import { Pasture } from "./components/Pasture";
import { MainTextPanel } from "./components/MainTextPanel";
import { AnimalsProvider, SocketProvider } from "./SocketProvider";

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
