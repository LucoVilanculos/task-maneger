import { useEffect, useState } from "react";

export const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div
    
      className={`fixed inset-0 flex items-center text-7xl justify-center bg-gradient-to-br from-blue-800 via-cyan-600 to-cyan-950 text-white font-black transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
        <img
            src="./img/gear.png"
            alt=""
            className="animate-pulse h-70"
          />
      Bem-vindo ao Task Manager 
      <br />
      <br />
      <br />
      Caregando...
    </div>
  );
};