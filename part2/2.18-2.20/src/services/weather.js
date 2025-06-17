import axios from "axios";

const OPENWEATHER_URL = import.meta.env.VITE_OPENWEATHER_API;
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getWeatherByCity = async (capital) => {
  const response = await axios.get(OPENWEATHER_URL, {
    params: {
      q: capital,
      appid: OPENWEATHER_API_KEY,
    },
  });
  return response.data;
};
