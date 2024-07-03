import PokemonApi from "./PokemonApi";
import { appendQueryParams } from "../helper";

const BASE_URL = "https://pokeapi.co/api/v2";

const apiRequest = async (type, params = {}) => {
  const endpoint = PokemonApi.endpoint(type, params);
  const requestParams = PokemonApi.requestParameters(type, params);

  let url = `${BASE_URL}${endpoint}`;
  if (requestParams !== null) {
    url = appendQueryParams(url, requestParams);
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export default apiRequest;
