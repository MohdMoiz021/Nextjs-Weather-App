"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("C");

  const fetchWeather = async (lat, lon) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max`
    );
    const data = await res.json();
    setWeather(data.current_weather);
    setForecast(data.daily);
  };

  const fetchCityWeather = async () => {
    if (!city) return;
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();
    if (!geoData.results) return;
    const { latitude, longitude } = geoData.results[0];
    fetchWeather(latitude, longitude);
  };

  const getWeatherIcon = (temperature) => {
    if (temperature > 30) return <WiDaySunny size={50} />;
    if (temperature > 20) return <WiCloudy size={50} />;
    if (temperature > 10) return <WiRain size={50} />;
    return <WiSnow size={50} />;
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-white p-6">
      <Header toggleUnit={toggleUnit} unit={unit} />
      <div className="w-full max-w-md mx-auto p-6 bg-white bg-opacity-10 rounded-xl shadow-md backdrop-blur-md">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter city..."
            className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white outline-none focus:ring-2 focus:ring-yellow-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchCityWeather}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
          >
            Get Weather
          </button>
        </div>

        {weather && (
          <div className="mt-6 p-5 rounded-xl bg-white bg-opacity-20 text-center shadow-lg">
            <h2 className="text-xl font-bold">{city}</h2>
            <div className="flex justify-center items-center gap-2 text-3xl">
              {getWeatherIcon(weather.temperature)}
              <span>
                {unit === "C"
                  ? weather.temperature
                  : (weather.temperature * 9) / 5 + 32}
                °{unit}
              </span>
            </div>
            <p>💨 Wind: {weather.windspeed} km/h</p>
          </div>
        )}

        {forecast.temperature_2m_max && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-3 text-center">
              {forecast.temperature_2m_max.map((temp, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-white bg-opacity-20"
                >
                  <p>Day {index + 1}</p>
                  <p>{unit === "C" ? temp : (temp * 9) / 5 + 32}°{unit}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
