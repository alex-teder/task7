import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

export function useAnimal(type, props) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(`/models/${type}.glb`);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);
  const WALKING_ANIMATION = "AnimalArmature|Walk";
  const IDLE_ANIMATION = props.idleAnimation || "AnimalArmature|Idle";
  const [animation, setAnimation] = useState(IDLE_ANIMATION);

  const position = useMemo(() => props.position, []);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.2).play();

    return () => {
      actions[animation].fadeOut(0.2);
    };
  }, [animation]);

  const MOVEMENT_SPEED = 0.05;

  useFrame(() => {
    if (group.current.position.distanceTo(props.position) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(props.position)
        .normalize()
        .multiplyScalar(MOVEMENT_SPEED);
      group.current.position.sub(direction);
      group.current.lookAt(props.position);
      setAnimation(WALKING_ANIMATION);
    } else {
      setAnimation(IDLE_ANIMATION);
    }
  });

  return { group, materials, animations, nodes, position };
}
