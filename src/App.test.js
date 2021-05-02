import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        weatherData: 'https://api.weather.gov/points/33.8001,-118.2962',
        temperature: '68°F',
        city: 'Lomita',
        state: 'CA',
      }),
  })
);

describe('App', () => {
  it('loads the weather data on mount', async () => {
    await act(async () => render(<App />));
    screen.getByText('Weather App');
    expect(screen.getByText('Weather App')).toBeInTheDocument();
  });
});
