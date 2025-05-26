import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import {
  envelopeOpenSound,
  envelopeCloseSound,
  sendSuccessSound,
  errorSound,
  clickSound,
  playSound,
} from "../constants/sounds";

const ContactSection = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showEnvelope, setShowEnvelope] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowEnvelope(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({ name: "", email: "", message: "" });
      setSuccessMessage("Message sent successfully!");
      playSound(sendSuccessSound);

      setTimeout(() => {
        playSound(envelopeCloseSound);
        setOpen(false); // close the envelope
        setSuccessMessage(""); // clear message
      }, 2000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      playSound(errorSound);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.section
        className="h-screen w-screen p-8 max-w-screen-2xl mx-auto
        flex items-center flex-col justify-center
        overflow-y-auto min-h-screen font-ubuntu"
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
        <AnimatePresence>
          {showEnvelope && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0, 10, 0],
                x: [0, 15, 0, -15, 0],
                rotate: [0, 1, 0, -1, 0],
                scale: 1,
              }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                opacity: { duration: 1, delay: 0.3 }, // fade-in once
                y: {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
                x: {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                },
              }}
              className="relative w-[300px] h-[200px] sm:w-[400px] sm:h-[250px] md:w-[600px] md:h-[350px]"
            >
              {/* Envelope Bottom */}
              <div
                className="absolute top-[90px] sm:top-[130px] md:top-[160px] w-full h-[110px] sm:h-[150px] md:h-[190px]
               bg-slate-800 backdrop-blur-sm 
        border-gray-800 border shadow-[0_0_15px_rgba(167,139,250,0.2)]
               rounded-b-[20px] sm:rounded-b-[25px] md:rounded-b-[30px] z-[310]"
              />

              {/* Envelope Left */}
              <div
                className="absolute top-0 w-0 h-0 
    border-l-[150px] sm:border-l-[200px] md:border-l-[300px]
    border-l-slate-700
    border-y-[90px] sm:border-y-[130px] md:border-y-[160px]
    border-y-transparent z-[310]"
              />

              {/* Envelope Right */}
              <div
                className="absolute top-0 left-[150px] sm:left-[200px] md:left-[300px] w-0 h-0 
    border-r-[150px] sm:border-r-[200px] md:border-r-[300px]
    border-r-slate-600 
    border-y-[90px] sm:border-y-[130px] md:border-y-[160px]
    border-y-transparent z-[310]"
              />

              {/* Envelope Top */}
              <div
                className={`absolute top-0 w-0 h-0 
    border-t-[110px] sm:border-t-[160px] md:border-t-[200px]
    border-t-slate-500
    border-x-[150px] sm:border-x-[200px] md:border-x-[300px]
    border-x-transparent border-y-transparent origin-top transition-transform duration-700 ease-in-out ${
      open ? "rotate-x-180 border-t-slate-800 opacity-50 z-[200]" : "z-[500]"
    }`}
              />

              {/* "Contact Me" Button */}
              {!open && (
                <button
                  onClick={() => {
                    playSound(envelopeOpenSound);
                    setOpen(true);
                  }}
                  className="absolute top-[150px] sm:top-[190px] md:top-[250px]
      left-[80px] sm:left-[135px] md:left-[208px] z-[311]
       sm:text-lg md:text-2xl px-3 sm:px-4 py-2 border-2 border-black
      rounded-lg duration-300 
      bg-indigo-600 text-white 
          text-lg  hover:bg-indigo-800 
         text-md font-semibold transition-all  ease-in-out
  bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700
   shadow-lg hover:shadow-indigo-400/30 hover:scale-105 hover:cursor-pointer
      "
                >
                  Contact Me
                </button>
              )}

              {/* Message Form with Framer Motion */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="form"
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -200, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute top-[20px] sm:top-[30px] w-[280px] sm:w-[370px] md:w-[580px]
        min-h-[200px] sm:min-h-[260px] md:min-h-[300px] mx-auto bg-gray-900/80 backdrop-blur-sm p-4 mb-4 border-gray-800 border shadow-[0_0_15px_rgba(167,139,250,0.2)] z-[350]"
                  >
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="p-4 space-y-6"
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 p-2 text-white bg-transparent"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 p-2 text-white bg-transparent"
                      />
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows="4"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 text-white bg-transparent"
                      ></textarea>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            playSound(clickSound);
                          }}
                          type="submit"
                          disabled={loading}
                          className="text-lg mt-2 hover:cursor-pointer
        text-md md:text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 ease-in-out
  bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700
  text-white shadow-lg hover:shadow-indigo-400/30 hover:scale-105"
                        >
                          {loading ? "Sending..." : "Send"}
                        </button>
                        {successMessage && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-green-400 text-sm ml-4"
                          >
                            {successMessage}
                          </motion.p>
                        )}
                      </div>
                    </form>
                    {/* Social Links */}
                    <div className="flex justify-end  gap-4 items-center">
                      <a
                        href="https://www.linkedin.com/in/deepu-raneesh-8483041b3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-200 hover:text-indigo-800 text-2xl"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href="mailto:deepututu1@gmail.com"
                        className="text-indigo-200 hover:text-indigo-800 text-2xl"
                      >
                        <FaEnvelope />
                      </a>
                      <a
                        href="https://github.com/Tutu2678"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-200 hover:text-indigo-800 text-2xl"
                      >
                        <FaGithub />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
};

export default ContactSection;
