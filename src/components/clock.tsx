// src/components/clock.tsx
import { useEffect, useState } from "react";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="text-cyan-600 text-4xl font-black flex justify-center animate-fade-in-up">
      🕒 {formatTime(time)}
    </div>
  );
};
