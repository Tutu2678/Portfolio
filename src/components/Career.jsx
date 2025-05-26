import { motion } from "motion/react";

const careerItems = [
  {
    image: `/careerImages/iit-madras.svg`,
    title: "IIT Madras",
    description:
      "Earned a Dual Degree (B.Tech. & M.Tech.) in Mechanical Engineering from IIT Madras.",
  },
  {
    image: `/careerImages/icici_bank.svg`,
    title: "ICICI Bank",
    description:
      "Worked as a Software Developer for 6 months, focusing on backend with Django and REST APIs.",
  },
  {
    image: `/careerImages/university-of-bath.svg`,
    title: "University of Bath",
    description:
      "Completed MSc in Computer Science, strengthening my technical skills and broadening my developer perspective.",
  },
];

const Career = () => {
  return (
    <motion.div
      whileInView={"visible"}
      className="max-w-screen-sm sm:max-w-4xl px-4 sm:px-0 mx-auto overflow-hidden"
    >
      <h2 className="text-whitetext-lg sm:text-xl md:text-2xl font-bold">
        About me
      </h2>
      <div className="mt-1 space-y-2">
        <motion.p
          className="p-1 text-[10px] sm:text-xs md:text-sm break-words"
          initial={{ opacity: 0, y: -50 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0 },
            },
          }}
        >
          Passionate developer with a solid foundation in engineering and
          computer science.
        </motion.p>
        {careerItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -50 }}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, delay: 0.2 + index * 0.2 },
              },
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 p-1 text-[10px] sm:text-xs md:text-sm break-words">
              <img
                src={item.image}
                alt={item.title}
                className="w-4 h-4 sm:w-6 sm:h-6 md:w-10 md:h-10 brightness-125"
              />
              <p className="flex-1 text-white">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Career;
