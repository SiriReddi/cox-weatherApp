import React from 'react';

const Weather = ({ temperature, city, state, country, error }) => {
  return (
    <div>
      {temperature && (
        <p className="content"> Temperature: {temperature} °F </p>
      )}
      {city && <p className="content"> City: {city} </p>}
      {state && <p className="content"> State: {state} </p>}
      {country && <p className="content"> Country/TimeZone: {country} </p>}
      {error && <p className="error"> {error} </p>}
    </div>
  );
};

export default Weather;
