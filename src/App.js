import React, { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import UnitToggle from './components/UnitToggle';
import axios from 'axios';
import { API_KEY } from './Constants';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // default to Celsius
  const [forecastData, setForecastData] = useState(null);
  const [cityInput, setCityInput] = useState('');

  const [error, setError] = useState(null);


  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
      // Call fetchForecastData when weather data is fetched to get the forecast
      fetchForecastData(city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('City not found'); // Set error message
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      setError('Forecast data not available'); // Set error message
    }
  };

  const handleSearch = () => {
    fetchWeatherData(cityInput);
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{
        backgroundImage: 'url(/images/bg-image.jpg)', 
      }}
    >
      <div className="w-full max-w-md p-4 bg-white bg-opacity-75 rounded-md">
        <h1 className="text-4xl font-bold mb-4 text-center">Weather Forecast App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="border p-2 mr-2 flex-grow"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {weatherData && (
          <>
            <CurrentWeather data={weatherData} unit={unit} />
            <Forecast city={weatherData.name} forecastData={forecastData} />
            <UnitToggle
            unit={unit}
            setUnit={setUnit}
            fetchWeatherData={fetchWeatherData}
            city={cityInput}
          />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
