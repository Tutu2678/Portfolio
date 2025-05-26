import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { clickSound, playSound } from "../constants/sounds";

const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button
        onClick={() => {
          playSound(clickSound);
          setMenuOpened(!menuOpened);
        }}
        className="z-20  fixed top-12 right-12 p-3 textcol  w-11 h-11 rounded-md
        transition-all duration-300 ease-in-out
  bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700
  text-white shadow-lg hover:shadow-indigo-400/30 hover:scale-105 hover:cursor-pointer
        "
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-80" : "w-0"}`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
          <MenuButton
            label="Home"
            onClick={() => {
              playSound(clickSound);
              onSectionChange(0);
            }}
          />
          <MenuButton
            label="About"
            onClick={() => {
              playSound(clickSound);
              onSectionChange(1);
            }}
          />
          <MenuButton
            label="Projects"
            onClick={() => {
              playSound(clickSound);
              onSectionChange(2);
            }}
          />
          <MenuButton
            label="Contact"
            onClick={() => {
              playSound(clickSound);
              onSectionChange(3);
            }}
          />
        </div>

        {/* Social Links */}
        <div className="flex justify-around items-center p-4 border-t border-gray-200">
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
        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 p-2">
          © {new Date().getFullYear()} Deepu Raneesh. All rights reserved.
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer text-black hover:text-indigo-700 transition-colors
      "
    >
      {label}
    </button>
  );
};

export default Menu;
