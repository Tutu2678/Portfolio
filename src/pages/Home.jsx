import { motion } from "motion/react";
import { clickSound, playSound } from "../constants/sounds";

const HomeSection = (props) => {
  const { onSectionChange } = props;
  return (
    <motion.section
      className={`
  h-screen w-screen max-w-screen-2xl mx-auto
  flex flex-col items-start mt-10 p-4 sm:p-6 lg:p-8

  `}
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
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug text-white mb-4">
        Hi, I'm
        <br />
        <span className=" px-1 italic">Deepu Raneesh</span>
      </h1>
      <motion.p
        className="text-xs sm:text-sm  md:text-lg text-white  sm:text-gray-400 md:mt-2"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I'm a{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-cyan-100">
          software developer {""}
        </span>
        with a passion for creating
        <br />
        innovative and user-friendly applications.
      </motion.p>

      <motion.button
        className="
          mt-3 hover:cursor-pointer md:mt-5
         font-semibold rounded-full transition-all duration-300 ease-in-out
  bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700
  text-white shadow-lg hover:shadow-indigo-400/30 hover:scale-105
  px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg
        "
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
        onClick={() => {
          playSound(clickSound);
          onSectionChange(3);
        }}
      >
        Contact me
      </motion.button>
    </motion.section>
  );
};

export default HomeSection;
