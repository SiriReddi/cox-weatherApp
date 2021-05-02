import React, { useState } from 'react';

import Form from './components/Form.jsx';
import Weather from './components/Weather.jsx';

import './App.css';

function App() {
  const [weather, setWeather] = useState([]);

  async function fetchWeather(e) {
    const long = e.target.longitude.value;
    const lat = e.target.latitude.value;

    e.preventDefault();
    const weatherData = await fetch(
      `https://api.weather.gov/points/${long},${lat}`
    )
      .then(res => {
        if (res.status >= 400) {
          return { error: 'Server responds with error!' };
        }
        return res.json();
      })
      .then(data => data);

    if (!weatherData.error) {
      setWeather({
        data: weatherData,
        temperature:
          weatherData.properties.relativeLocation.properties.bearing.value,
        city: weatherData.properties.relativeLocation.properties.city,
        state: weatherData.properties.relativeLocation.properties.state,
        country: weatherData.properties.timeZone,
        error: '',
      });
    } else {
      setWeather({
        data: '',
        temperature: '',
        city: '',
        state: '',
        country: '',
        error: ' Please enter valid Longitude and Latitude values',
      });
    }
  }
  return (
    <div className="App">
      <h2 className="title"> Weather App</h2>
      <Form getWeather={fetchWeather} />
      <Weather
        temperature={weather.temperature}
        city={weather.city}
        state={weather.state}
        country={weather.country}
        error={weather.error}
      />
    </div>
  );
}

export default App;
