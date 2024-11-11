import { useState } from "react";
import { cities } from "../../constants/constants";
import { ShowWeather } from "./ShowWeather";

function WeatherView({ onCityChange }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showWeather, setShowWeather] = useState(false); // Nuevo estado

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setShowWeather(false); // Oculta el clima hasta que se seleccione una opción

    // Filtra las ciudades que coinciden con el texto escrito
    if (city) {
      const matches = cities.filter((c) =>
        c.toLowerCase().includes(city.toLowerCase())
      );
      setFilteredCities(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    if (onCityChange) {
      onCityChange(city);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowSuggestions(false);
    setShowWeather(true); // Muestra el clima solo cuando se selecciona de la lista
    if (onCityChange) {
      onCityChange(city);
    }
  };

  return (
    <div className="mt-4 relative">
      <label
        htmlFor="city-input"
        className="block mb-2 text-md font-medium text-gray-700 text-center"
      >
        Selecciona tu ciudad en Colombia
      </label>
      <p className="text-sm text-center">Tienes Que Seleccionar Alguna De las Sugerencias</p>
      <input
        id="city-input"
        value={selectedCity}
        onChange={handleCityChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Escribe tu ciudad"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        autoComplete="off"
      />
      
      {showSuggestions && filteredCities.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto shadow-lg">
          {filteredCities.map((city) => (
            <li
              key={city}
              onClick={() => handleCitySelect(city)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      <div>
        {showWeather && <ShowWeather city={selectedCity} />}
      </div>
    </div>
  );
}

export default WeatherView;
