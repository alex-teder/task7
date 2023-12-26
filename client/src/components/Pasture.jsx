import * as THREE from "three";
import { Environment, OrbitControls } from "@react-three/drei";
import { Cow } from "./Cow";
import { Bull } from "./Bull";
import { useContext, useEffect, useState } from "react";
import { AnimalsContext } from "../AnimalProvider";

export const Pasture = () => {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      {/* <OrbitControls /> */}
      {/* <ContactShadows blur={5} opacity={0.5} /> */}
      <Animals />
    </>
  );
};

function Animals() {
  const { bulls, cows } = useContext(AnimalsContext);

  const POSITIONS = {
    IN: [
      [2, 0, 3],
      [-5, 0, 5],
      [2, 0, 15],
      [-20, 0, 10],
      [-17, 0, 1],
      [12, 0, 7],
      [-2, 0, -12],
      [-10, 0, 12],
    ].map(([x, y, z]) => new THREE.Vector3(x, 0, z)),
    OUT: [
      [13, 0, 25], // !
      [-35, 0, -35], // !
      [0, 0, 35], // !
      [-40, 0, 20], // !
      [-53, 0, -10], // !
      [25, 0, 15],
      [-18, 0, -46],
      [-30, 0, 30], // !
    ].map(([x, y, z]) => new THREE.Vector3(x, 0, z)),
  };

  const calculatePositions = (bulls, cows) => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      if (cows > i) {
        result.push(POSITIONS.IN[i]);
      } else {
        result.push(POSITIONS.OUT[i]);
      }
    }
    for (let i = 0; i < 4; i++) {
      if (bulls > i) {
        result.push(POSITIONS.IN[i + 4]);
      } else {
        result.push(POSITIONS.OUT[i + 4]);
      }
    }
    return result;
  };

  const [positions, setPositions] = useState(POSITIONS.OUT);
  useEffect(() => {
    setPositions(calculatePositions(bulls, cows));
  }, [bulls, cows]);

  const animals = [Cow, Cow, Cow, Cow, Bull, Bull, Bull, Bull];

  const IDLE_ANIMATIONS_LIST = ["AnimalArmature|Idle", "AnimalArmature|Eating"];

  return (
    <>
      {animals.map((Animal, idx) => (
        <Animal
          position={positions[idx]}
          idleAnimation={IDLE_ANIMATIONS_LIST[Math.floor(Math.random() * 3)]}
          key={idx}
        />
      ))}
    </>
  );
}
