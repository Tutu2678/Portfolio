import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience.jsx";
import { ScrollControls, Scroll } from "@react-three/drei";
import Interface from "./components/Interface.jsx";
import { ScrollManager } from "./components/ScrollManager.jsx";
import Menu from "./components/Menu.jsx";
import { MotionConfig } from "motion/react";
import { framerMotionConfig } from "./config.js";
import { useRef } from "react";
import { LoadingScreen } from "./components/LoadingScreen.jsx";
import { Cursor } from "./components/Cursor.jsx";

const App = () => {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  const [started, setStarted] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        <Canvas shadows camera={{ position: [0, 2, 5] }}>
          <color attach="background" args={["#1c1c1f"]} />

          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />

            <Scroll>
              <Experience section={section} menuOpened={menuOpened} />
            </Scroll>

            <Scroll html>
              <Interface onSectionChange={setSection} />
            </Scroll>
          </ScrollControls>
        </Canvas>

        <Menu
          onSectionChange={setSection}
          menuOpened={menuOpened}
          setMenuOpened={setMenuOpened}
        />
        <Cursor />
      </MotionConfig>
      <footer className="w-full text-center py-4 text-sm text-gray-400 bg-transparent fixed bottom-0">
        &copy; {new Date().getFullYear()} Deepu Raneesh. All rights reserved.
      </footer>
    </>
  );
};

export default App;
