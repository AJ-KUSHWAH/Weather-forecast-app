import React from 'react';

function Forecast({ forecastData }) {
  if (!forecastData || !forecastData.list) {
    return null; // Return early if data is not available
  }

  const uniqueDates = Array.from(
    new Set(forecastData.list.map((item) => new Date(item.dt * 1000).toLocaleDateString()))
  );

  return (
    <div>
      <h2 className='text-center text-blue-700 text-xl font-bold'>5-Day Forecast</h2>
      <div>
        {uniqueDates.slice(0, 5).map((date) => {
          const dayData = forecastData.list.find(
            (item) => new Date(item.dt * 1000).toLocaleDateString() === date
          );

          return (
            dayData && (
              <div className='p-3 flex flex-row' key={dayData.dt}>
                <p>Date: {date}</p>
                <p>Average Temperature: {dayData.main.temp}</p>
                <p>Description: {dayData.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`} alt="Weather Icon" />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
