import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
