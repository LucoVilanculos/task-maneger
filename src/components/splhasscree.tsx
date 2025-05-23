import { useEffect, useState } from "react";

export const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-800 via-cyan-600 to-cyan-950 text-white font-black transition-all duration-1000 ${
        fadeOut ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex flex-col items-center text-center px-4">
        <img
          src="./img/gear.png"
          alt="Gear"
          className="animate-spin-slow h-20 lg:h-70 mb-6"
        />
        <h1 className="text-[2rem] lg:text-7xl animate-fade-in-up mb-4">
          Bem-vindo ao Task Manager
        </h1>
        <br />
        <p className="text-xl lg:text-4xl animate-pulse">Carregando...</p>
      </div>
    </div>
  );
};