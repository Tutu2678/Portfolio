import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = () => {
  const material = useRef();
  const color = useRef({
    color: "#1c1c1f",
  });
  const data = useScroll();
  const tl = useRef();

  useFrame(() => {
    tl.current?.progress(data.scroll.current);
    material.current.color = new THREE.Color(color.current.color);
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, { color: "#2c2c2c" });
    tl.current.to(color.current, { color: "#3f3f5a" });
    tl.current.to(color.current, { color: "#5c5c8a" });
    tl.current.to(color.current, { color: "#7a7a99" });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};

export default Background;
