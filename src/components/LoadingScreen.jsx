import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 1000);
    }
  }, [progress, total, loaded, item]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
    flex items-center justify-center bg-[#23232d] 
    ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative font-bold text-[#e76f51] flex flex-col items-center">
        <div
          className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500 text-center whitespace-nowrap"
          style={{ width: `${progress}%` }}
        >
          <span className="text-base sm:text-lg md:text-3xl lg:text-5xl xl:text-6xl">
            Welcome to Deepu&apos;s Portfolio
          </span>
        </div>
        <div className="opacity-40 text-[#cfc8b8] text-center whitespace-nowrap">
          <span className="text-base sm:text-lg md:text-3xl lg:text-5xl xl:text-6xl">
            Welcome to Deepu&apos;s Portfolio
          </span>
        </div>
      </div>
    </div>
  );
};
