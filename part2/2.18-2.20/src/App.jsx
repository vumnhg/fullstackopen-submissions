import { useState, useEffect } from "react";
import Form from "./Form";
import { getCountries } from "./services/countries";
import Contents from "./Contents";
import Content from "./Content";
import { getWeatherByCity } from "./services/weather";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const countriesData = await getCountries();
        setData(countriesData);
      } catch (error) {
        console.log("Unable to load countries data ", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!country || !country.capital) return;
    (async () => {
      try {
        const weatherData = await getWeatherByCity(country.capital[0]);
        setWeather(weatherData);
      } catch (error) {
        console.log("Unable to load weather data ", error);
      }
    })();
  }, [country]);

  const queryCountry = (value) => {
    setInput(value);
    let targetCountry = value.trim().toLowerCase();
    if (!targetCountry) {
      setCountries([]);
      setMessage("");
      setCountry(null);
      return;
    }
    const filteredCountries = data.filter((country) => {
      let countryName = country.name.common.toLowerCase();
      return countryName.includes(targetCountry);
    });

    const len = filteredCountries.length;
    if (len > 10) {
      setMessage("Too many matches, specify another filter");
    } else if (len === 1) {
      setCountry(filteredCountries[0]);
      setCountries([]);
      setMessage("");
    } else if (len <= 10) {
      setCountries(filteredCountries);
      setCountry(null);
      setMessage("");
    }
  };

  const showCountry = ({ ccn3, name }) => {
    const targetCountry = data.find(
      (country) => country.name.ccn3 === ccn3 && country.name.common === name
    );
    setCountry(targetCountry);
    setCountries([]);
    setMessage("");
    setInput("");
  };

  return (
    <div>
      <Form input={input} onInput={queryCountry} />

      {isLoading && <p>Loading...</p>}

      {!isLoading && message && <p>{message}</p>}

      {!isLoading && country && <Content country={country} weather={weather} />}

      {!isLoading && !country && countries.length > 0 && (
        <Contents countries={countries} onClick={showCountry} />
      )}
    </div>
  );
};

export default App;
