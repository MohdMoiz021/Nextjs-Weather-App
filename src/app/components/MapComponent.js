"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Custom marker icon for Leaflet (Leaflet doesn't support default markers in Next.js)
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapComponent({ latitude, longitude, city, weather }) {
  const [position, setPosition] = useState([latitude, longitude]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <div className="mt-6 w-full h-[300px] rounded-xl overflow-hidden border border-gray-300">
      <MapContainer center={position} zoom={10} className="h-full w-full">
        {/* OpenStreetMap TileLayer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Weather Location Marker */}
        <Marker position={position} icon={customIcon}>
          <Popup>
            <h3 className="text-lg font-bold">{city}</h3>
            {weather ? (
              <p>🌡 Temp: {weather.temperature}°C</p>
            ) : (
              <p>Loading weather...</p>
            )}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
