import { useRef, useEffect, useState } from "react";
import { SpotLight, Cylinder } from "@react-three/drei";
import Computers from "./Computers.jsx";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useMotionValue, animate } from "motion/react";
import { framerMotionConfig } from "../config.js";
import AvatarLookingAround from "./AvatarLookingAround.jsx";
import AvatarStretching from "./AvatarStretching.jsx";
import Background from "./Background.jsx";

const Experience = (props) => {
  const { section, menuOpened } = props;

  const { viewport, size } = useThree();

  const isMobile = size.width < 768;

  const [scale, setScale] = useState(1);

  const isExtraSmall = size.width < 480;

  useEffect(() => {
    // Adjust position based on width/height dynamically
    const isMobile = size.width < 768;

    setScale(isMobile ? 1 : 2.5);
  }, [viewport, size]);

  const group = useRef();
  const stretchRef = useRef();

  const show = section === 1 && !menuOpened;

  useEffect(() => {
    if (stretchRef.current) {
      gsap.to(stretchRef.current.scale, {
        x: show ? scale : 0,
        y: show ? scale : 0,
        z: show ? scale : 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [show]);

  // fall Animation
  useFrame((state, delta) => {
    const y = section === 0 ? 0 : -1;
    const speed = 3;
    group.current.position.y += (y - group.current.position.y) * speed * delta;
  });

  // Camera animation
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  // Scale animation
  useEffect(() => {
    gsap.to(group.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    gsap.to(group.current.scale, {
      x: section === 0 ? 1 : 0,
      y: section === 0 ? 1 : 0,
      z: section === 0 ? 1 : 0,
      duration: 3,
      ease: "power2.out",
    });
  }, [section]);

  useEffect(() => {
    console.log("section:", section);
  }, [section]);

  return (
    <>
      <Background />
      <group ref={group} position={[0, 5, 0]}>
        <ambientLight intensity={1} />
        <SpotLight
          position={[0, 4.5, 0]}
          angle={Math.PI / 2}
          penumbra={1}
          intensity={200}
          distance={17}
          castShadow
          visible={section === 0}
          direction={[0, -1, 0]}
        />

        <Computers position={[0, -1.5, 0]} scale={0.5} receiveShadow />

        <AvatarLookingAround
          position={[0, -1.5, 1]}
          scale={0.85}
          rotation={[0, Math.PI, 0]}
          receiveShadow
        />

        <Cylinder
          args={[5, 5, 0.2, 64]} // radius, height, radial segments
          rotation={[0, -Math.PI / 2, 0]}
          position={[0, -1.6, -2]}
          receiveShadow
        >
          <meshBasicMaterial
            map={new THREE.TextureLoader().load("textures/floor.jpg")}
            repeat={[10, 10]}
          />
        </Cylinder>
      </group>
      {!isExtraSmall && (
        <group
          ref={stretchRef}
          position={[
            isMobile ? 0 : 2,
            isMobile ? -viewport.height - 5.5 : -viewport.height - 3,
            0,
          ]}
          rotation={[-Math.PI / 9, 0, 0]}
          scale={scale}
        >
          <AvatarStretching />
        </group>
      )}
    </>
  );
};

export default Experience;
