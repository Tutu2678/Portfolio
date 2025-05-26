import React from "react";
import { motion } from "motion/react";

const skills = [
  { icon: "html.png", title: "HTML" },
  { icon: "css.png", title: "CSS" },
  { icon: "javascript.png", title: "JavaScript" },
  { icon: "reactjs.png", title: "ReactJS" },
  { icon: "tailwind.png", title: "Tailwind" },
  { icon: "framer.png", title: "Framer" },
  { icon: "threejs.svg", title: "Three.js" },
  { icon: "nodejs.png", title: "Node.js" },
  { icon: "express.png", title: "Express" },
  { icon: "mongodb.png", title: "MongoDB" },
  { icon: "django.svg", title: "Django" },
  { icon: "python.svg", title: "Python" },
  { icon: "postgresql.svg", title: "PostgreSQL" },
  { icon: "socket-io.svg", title: "Socket.io" },
  { icon: "zustand.svg", title: "Zustand" },
  { icon: "git.png", title: "Git" },
  { icon: "blender.png", title: "Blender" },
];

const Skills = () => {
  return (
    <motion.div whileInView={"visible"}>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Skills</h2>
      <div className=" mt-2 space-y-2">
        <motion.div
          whileInView={"visible"}
          initial={{
            opacity: 0,
            y: -50,
          }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: 0.5,
              },
            },
          }}
        >
          <div className="flex flex-col space-y-4">
            <div>
              <div className="flex flex-wrap justify-center">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="m-4"
                    initial={{
                      opacity: 0,
                    }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + index * 0.2,
                        },
                      },
                    }}
                  >
                    <img
                      src={`/tech/${skill.icon}`}
                      alt={skill.title}
                      className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 brightness-125"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default Skills;
