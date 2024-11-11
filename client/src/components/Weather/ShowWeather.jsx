import React, { useState, useEffect } from "react";
import axios from "axios";

// Mapeo de traducciones para términos comunes
const translations = {
  "Partly cloudy": "Parcialmente nublado ⛅",
  "Sunny": "Soleado ☀️",
  "Rain": "Lluvia 🌧️",
  "Clear": "Despejado 🌤️",
  "Thunderstorm": "Tormenta eléctrica",
  "Light rain shower": "Lluvia Ligera 🌦️",
  "Thunderstorm in vicinity, rain with thunderstorm":"Tormenta en las proximidades, lluvia con tormenta",
  
};

export function ShowWeather({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://wttr.in/${city}?format=j1`);
        console.log(response.data)
        if (response.data){
          setWeather(response.data);
          setLoading(false);
        }else {
          setLoading(false)
        }
      } catch (error) {
        console.error("Error al obtener el clima:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <div className="mt-2">Cargando...</div>;
  }

  if (!weather) {
    return <div className="mt-2">No se pudo obtener el clima para {city}. <br /> Por Favor intentelo de nuevo más tarde.</div>;
  }

  const { current_condition } = weather;
  const temperature = current_condition[0].temp_C;
  let weatherDesc = current_condition[0].weatherDesc[0].value;

  // Aplicar traducción si existe
  weatherDesc = translations[weatherDesc] || weatherDesc;

  // Determina la clase de fondo en función de la descripción del clima
  const backgroundClass = weatherDesc === "Lluvia Ligera" 
    ? "bg-blue-300" 
    : weatherDesc === "Soleado" 
    ? "bg-yellow-500" 
    : weatherDesc === "Despejado 🌤️" 
    ? "bg-yellow-300" 
    : weatherDesc === "Lluvia Ligera 🌦️" 
    ? "bg-blue-500" 
    : "bg-gray-300"; 

  return (
    <div className={`mt-4 p-4 rounded-lg ${backgroundClass} bg-y`}>
      <div className="text-2xl font-bold">{city}</div>
      <div className="text-lg">Temperatura: {temperature}°C</div>
      <div className="text-md">Clima: {weatherDesc}</div>
    </div>
  );
}
