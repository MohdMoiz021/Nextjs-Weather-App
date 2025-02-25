"use client";

import { useState, useEffect } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { WiCelsius, WiFahrenheit } from "react-icons/wi";

export default function Header({ toggleUnit, unit }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center p-5 bg-blue-500 dark:bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">🌤 Weather App</h1>

      <div className="flex gap-4 items-center">
        <button
          onClick={toggleUnit}
          className="bg-yellow-400 p-2 rounded-full text-black hover:bg-yellow-500 transition"
        >
          {unit === "C" ? <WiFahrenheit size={24} /> : <WiCelsius size={24} />}
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
        >
          {darkMode ? <BsFillSunFill size={24} /> : <BsMoonFill size={24} />}
        </button>
      </div>
    </header>
  );
}
