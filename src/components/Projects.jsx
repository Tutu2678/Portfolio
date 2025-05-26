import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { card_swipe, clickSound, playSound, swoosh } from "../constants/sounds";

const portfolioProjects = [
  {
    title: "Zentry Clone",
    image: "/projectImages/zentry.png",
    skills: ["reactjs.png", "tailwind.png", "gsap.svg"],
    link: "https://zentry-clone-omega-plum.vercel.app/",
  },
  {
    title: "Apple iPhone 15 Pro Website Clone",
    image: "/projectImages/iphone.png",
    skills: ["reactjs.png", "tailwind.png", "gsap.svg", "threejs.svg"],
    link: "https://i-phone15-pro-clone-five.vercel.app/",
  },
  {
    title: "Full Stack Realtime Chat App",
    image: "/projectImages/chatty.png",
    skills: [
      "reactjs.png",
      "nodejs.png",
      "express.png",
      "mongodb.png",
      "socket-io.svg",
      "tailwind.png",
      "daisyui.svg",
      "zustand.svg",
    ],
    link: "https://full-stack-real-time-chat-app.onrender.com/",
  },
  {
    title: "My Portfolio",
    image: "/projectImages/portfolio.png",
    skills: [
      "reactjs.png",
      "tailwind.png",
      "gsap.svg",
      "threejs.svg",
      "framer.png",
    ],
    link: "",
  },
  {
    title: "Multi-language Online Code Editor",
    image: "/projectImages/codeit.png",
    skills: ["reactjs.png", "tailwind.png", "daisyui.svg"],
    link: "https://code-editor-one-sigma.vercel.app/",
  },
];

const Projects = () => {
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const scrollRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const quantity = portfolioProjects.length;
  const radius = 300;

  const scrollByCard = (direction) => {
    const cardWidth = 300 + 16;
    scrollRef.current.scrollLeft += direction * cardWidth;
  };

  useEffect(() => {
    const tl = gsap.timeline();

    if (isPaused) {
      tl.to(carouselRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
        onStart: () => {
          carouselRef.current.style.pointerEvents = "none";
        },
      });

      tl.fromTo(
        scrollContainerRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => {
            scrollContainerRef.current.style.pointerEvents = "auto";
          },
        },
        "-=0.2"
      );

      tl.fromTo(
        cardRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.1"
      );
    } else {
      tl.to(scrollContainerRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power2.out",
        onStart: () => {
          scrollContainerRef.current.style.pointerEvents = "none";
        },
      });

      tl.fromTo(
        carouselRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          onStart: () => {
            carouselRef.current.style.pointerEvents = "auto";
          },
        },
        "-=0.2"
      );
    }
  }, [isPaused]);

  return (
    <>
      <div className="text-xl md:text-2xl font-bold mb-2">
        <div className="flex items-center justify-center gap-x-4">
          {!isPaused && (
            <h1 className="text-4xl md:text-5xl font-poppins tracking-wide font-semibold leading-snug text-white text-center mb-6">
              Explore My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 drop-shadow-sm">
                Projects
              </span>{" "}
              in 3D!
            </h1>
          )}

          <a
            onClick={() => {
              playSound(clickSound);
              setIsPaused(!isPaused);
            }}
            className="inline-block text-md md:text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 ease-in-out
  bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700
  text-white shadow-lg hover:shadow-indigo-400/30 hover:scale-105 hover:cursor-pointer"
          >
            {isPaused ? "Switch to 3D Carousel" : "View as Slider"}
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-screen-2xl h-[450px]">
          {/* 3D Carousel */}
          <div
            ref={carouselRef}
            className="absolute inset-0 flex justify-center items-center"
          >
            <div
              className="relative w-[200px] h-[250px] md:w-[225px] md:h-[275px] rounded-xl "
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(1000px)",
                animation: "spin3D 20s linear infinite",
              }}
            >
              {portfolioProjects.map((project, index) => {
                const angle = (360 / quantity) * index;
                return (
                  <div
                    key={index}
                    className="absolute inset-0  flex items-center justify-center rounded-xl shadow-lg"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    }}
                  >
                    <img
                      src={project.image}
                      alt={`carousel-${index}`}
                      className="w-full h-full object-fill p-2 rounded-2xl"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Cards */}
          <div ref={scrollContainerRef} className="absolute inset-0">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar h-full items-center"
            >
              <div className="shrink-0 w-[calc((100%-300px)/2)] md:w-[calc((100%-400px)/5)]" />
              {portfolioProjects.map((project, index) => (
                <div
                  key={index}
                  ref={addToRefs}
                  className="project-card w-[300px] min-w-[300px] h-[400px] md:min-w-[400px] 
    rounded-xl snap-center shrink-0 opacity-0 relative overflow-hidden
    bg-gray-900/80 backdrop-blur-sm  p-4 mb-4
    border-gray-800 border shadow-[0_0_15px_rgba(167,139,250,0.2)]
    "
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-fill absolute top-0 left-0"
                  />
                  <div className="card-info p-6 flex flex-col justify-end h-full">
                    <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {project.skills.map((skill, index) => (
                        <img
                          key={index}
                          src={`/tech/${skill}`}
                          alt={skill}
                          className="w-8 h-8 md:w-10 md:h-10 object-contain brightness-125"
                        />
                      ))}
                    </div>
                    <a
                      href={project.link}
                      rel="noopener noreferrer"
                      target="_blank"
                      className={`btn flex items-center justify-center text-center bg-indigo-500 text-sm font-bold py-1 px-4 rounded-full
  transition-all duration-300 ease-in-out
  bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700
  text-white shadow-lg hover:shadow-indigo-400/30 hover:scale-105 hover:cursor-pointer
                        ${
                          project.title === "My Portfolio"
                            ? "pointer-events-none cursor-default opacity-60"
                            : "hover:bg-indigo-700 hover:text-white"
                        }`}
                    >
                      {project.title === "My Portfolio"
                        ? "You're viewing it now!"
                        : "Visit Website"}
                    </a>
                  </div>
                </div>
              ))}
              <div className="shrink-0 w-[calc((100%-300px)/2)] md:w-[calc((100%-400px)/5)]" />
            </div>
          </div>
        </div>
        {isPaused && (
          <div className="flex justify-center p-4 ">
            <button
              onClick={() => {
                playSound(card_swipe);
                scrollByCard(-1);
              }}
              className="m-2 w-10 h-10 flex items-center justify-center
  bg-indigo-600  rounded-full hover:bg-indigo-700 hover:cursor-pointer transition-all duration-300 ease-in-out
  bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700
  text-white shadow-lg hover:shadow-indigo-400/30 hover:scale-105"
            >
              <FiChevronLeft size={24} />
            </button>

            <button
              onClick={() => {
                playSound(card_swipe);
                scrollByCard(1);
              }}
              className="m-2 w-10 h-10 flex items-center justify-center
  bg-indigo-600  rounded-full hover:bg-indigo-700 hover:cursor-pointer transition-all duration-300 ease-in-out
  bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700
  text-white shadow-lg hover:shadow-indigo-400/30 hover:scale-105"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
