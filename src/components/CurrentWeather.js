import React from 'react';

const CurrentWeather = ({ data }) => {

  return (
    <div className='text-center p-2 my-4'>
      <h2 className='text-center text-blue-700 text-xl font-bold'>Current Weather in {data.name}</h2>
      <p className='mt-2'>Temperature: {data.main.temp}</p>
      <p>Min Temperature: {data.main.temp_min}</p>
      <p>Max Temperature: {data.main.temp_max}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed} m/s, {data.wind.deg}°</p>
      <p>Description: {data.weather[0].description}</p>
      <img className='mx-auto' src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon" />
    </div>
  );
};

export default CurrentWeather;
