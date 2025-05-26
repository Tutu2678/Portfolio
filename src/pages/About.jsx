import { motion } from "motion/react";
import Skills from "../components/Skills";
import Career from "../components/Career";
import { useState, useRef } from "react";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");

  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 5;
    const tiltY = (relativeY - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg)
    rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  return (
    <motion.section
      className={`
        h-screen w-screen p-8 max-w-screen-2xl mx-auto
        flex flex-col items-start justify-center
        overflow-y-auto 
      `}
      style={{ height: "100vh" }}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="flex flex-col">
          <BentoTilt>
            <div
              className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 mb-4 
        border-gray-800 border shadow-[0_0_15px_rgba(167,139,250,0.2)] "
            >
              <Career />
            </div>
          </BentoTilt>
          <BentoTilt>
            <div
              className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 mb-4 
        border-gray-800 border shadow-[0_0_15px_rgba(167,139,250,0.2)] "
            >
              <Skills />
            </div>
          </BentoTilt>
        </div>
      </div>
    </motion.section>
  );
};
export default AboutSection;
