import axios from "axios";

const COUNTRIES_API = import.meta.env.VITE_COUNTRIES_API;

export const getCountries = async () => (await axios.get(COUNTRIES_API)).data;
