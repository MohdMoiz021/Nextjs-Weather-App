"use client";

import { useState } from "react";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [latitude, setLatitude] = useState(20.5937);
  const [longitude, setLongitude] = useState(78.9629);
  const [unit, setUnit] = useState("C");

  const fetchWeather = async () => {
    if (!city) return;

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();
    if (!geoData.results) return;

    const { latitude, longitude } = geoData.results[0];
    setLatitude(latitude);
    setLongitude(longitude);

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    setWeather(weatherData.current_weather);
  };

  const getWeatherIcon = (temperature) => {
    if (temperature > 30) return <WiDaySunny size={60} className="text-yellow-500" />;
    if (temperature > 20) return <WiCloudy size={60} className="text-gray-300" />;
    if (temperature > 10) return <WiRain size={60} className="text-blue-400" />;
    return <WiSnow size={60} className="text-white" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b5876] to-[#4e4376] text-white p-6 flex flex-col items-center">
      <Header />
      <div className="w-full mt-11 max-w-lg p-8 bg-white bg-opacity-20 rounded-2xl shadow-xl backdrop-blur-lg border border-white border-opacity-30">
        <h1 className="text-2xl font-bold text-center mb-4">🌍 Weather App</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter city..."
            className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="bg-yellow-400 text-black px-5 py-3 rounded-lg font-bold hover:bg-yellow-500 transition shadow-lg"
          >
            Get Weather
          </button>
        </div>

        {weather && (
          <div className="mt-6 p-5 rounded-xl bg-white bg-opacity-30 text-center shadow-lg backdrop-blur-lg border border-white border-opacity-30">
            <h2 className="text-2xl font-semibold">{city}</h2>
            <div className="flex justify-center items-center gap-4 mt-2 text-3xl">
              {getWeatherIcon(weather.temperature)}
              <span className="text-4xl font-extrabold">{weather.temperature}°C</span>
            </div>
            <p className="text-lg text-gray-200">💨 Wind Speed: {weather.windspeed} km/h</p>
          </div>
        )}

        {/* Map Component */}
        <MapComponent latitude={latitude} longitude={longitude} city={city} weather={weather} />
      </div>
    </div>
  );
}
