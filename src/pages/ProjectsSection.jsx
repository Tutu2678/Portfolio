import { motion } from "motion/react";
import Projects from "../components/Projects";

const ProjectsSection = () => {
  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-centre justify-center
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
      <Projects />
    </motion.section>
  );
};

export default ProjectsSection;
