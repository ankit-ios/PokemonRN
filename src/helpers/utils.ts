// helpers/utils.js

export const getPokemonIdFromUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

export const getPokemonThumbnailUrl = (pokemonId) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`;
};

export const appendQueryParams = (url, params) => {
  const urlObj = new URL(url);

  Object.keys(params).forEach((key) =>
    urlObj.searchParams.append(key, params[key])
  );

  return urlObj.toString();
};
