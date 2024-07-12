import PokemonApi from "./PokemonApi";
import { appendQueryParams } from "../utils/helper";

const BASE_URL = "https://pokeapi.co/api/v2";

const ApiRequest = async (type, params = {}) => {
  const endpoint = PokemonApi.endpoint(type, params);
  const requestParams = PokemonApi.requestParameters(type, params);

  console.log("endpoint => " + endpoint);
  let url = `${BASE_URL}${endpoint}`;
  if (requestParams !== null) {
    url = appendQueryParams(url, requestParams);
  }


  console.log("url => " + url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response => "+response);
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

export default ApiRequest;
