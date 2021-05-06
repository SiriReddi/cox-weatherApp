import React from 'react';
import {
  render,
  cleanup,
  act,
  fireEvent,
  screen,
} from '@testing-library/react';

import Form from './components/Form.jsx';

import App from './App';

const mockOnSubmit = jest.fn();

describe('Form', () => {
  describe('with valid inputs', () => {
    afterEach(cleanup);

    it('calls the onSubmit function', async () => {
      await render(<Form onSubmit={mockOnSubmit('33.8001,-118.2962')} />);

      const longitude = screen.getByPlaceholderText('longitude');
      const latitude = screen.getByPlaceholderText('longitude');

      fireEvent.input(longitude);
      fireEvent.input(latitude);

      const button = screen.getByRole('button');
      fireEvent.submit(button);

      expect(mockOnSubmit).toBeCalledWith('33.8001,-118.2962');
    });
  });
});

async function fetchWeather() {
  const res = await fetch('https://api.weather.gov/points/33.8001,-118.2962');
  const json = await res.json();

  return json;
}
describe('App', () => {
  test('works', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
      );

    render(<App />);
    const json = await fetchWeather();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.weather.gov/points/33.8001,-118.2962'
    );

    expect(Array.isArray(json)).toEqual(true);
    expect(json.length).toEqual(0);
  });
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    data: () => ({
      temperature: '68°F',
      city: 'alpharetta',
      state: 'CA',
    }),
  })
);
describe('after fetching the data successfully', () => {
  it('handles the state successfully', async () => {
    await act(async () => render(<App />));

    screen.getByText('Weather App');
    expect(screen.getByText('Weather App')).toBeInTheDocument();
  });
});

