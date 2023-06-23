import { useState } from "react";
import axios from "axios";

import Countries from "./components/Countries";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setStatus] = useState("idle");

  const getCountries = event => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    axios
      .get(
        `https://restcountries.com/v3.1/name/${query}?fields=name,capital,area,languages,flags,latlng`
      )
      .then(res => {
        setCountries(res.data);
      })
      .catch(_ => {
        setCountries([]);
        setErrorMessage("No results found");
      });

    setStatus("idle");
  };

  const getCountry = name => {
    axios
      .get(
        `https://restcountries.com/v3.1/name/${name}?fullText=true&fields=name,capital,area,languages,flags,latlng`
      )
      .then(res => setCountries(res.data));
  };

  return (
    <div>
      <form onSubmit={getCountries}>
        Find Countries:{" "}
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {status === "loading" && <p>Loading...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {countries.length > 10 && (
        <p>Too many matches, please specify another filter</p>
      )}

      {countries.length < 10 && countries.length > 0 && (
        <Countries getCountry={getCountry} countries={countries} />
      )}
    </div>
  );
};

export default App;
