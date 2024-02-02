// UnitToggle.js
import React from 'react';

const UnitToggle = ({ unit, setUnit, fetchWeatherData, city }) => {
  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    // Fetch weather data again with the updated unit after a brief delay
    setTimeout(() => {
      fetchWeatherData(city);
    }, 100);
  };
  

  return (
    <div className="bg-blue-500 text-white text-center py-2 px-4 rounded">
      <button onClick={toggleUnit}>
        Toggle Unit ({unit === 'metric' ? 'Celsius' : 'Fahrenheit'})
      </button>
    </div>
  );
};

export default UnitToggle;
