import { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const api_key = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=imperial&appid=${api_key}`
      )
      .then(res => setWeatherData(res.data))
      .catch(error => console.log(error));
  }, [country]);

  return (
    <>
      {!weatherData ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages: </h3>
          <ul>
            {Object.keys(country.languages).map((key, index) => (
              <li key={index}>{country.languages[key]}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt} />;
          <h3>Weather in {country.name.common}</h3>
          {weatherData && <Weather report={weatherData} />}
        </>
      )}
    </>
  );
};

export default Country;
