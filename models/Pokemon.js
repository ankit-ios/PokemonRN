import { getPokemonIdFromUrl, getPokemonThumbnailUrl } from "../utils/helper";

class Pokemon {
  constructor(item) {
    const pokemonId = getPokemonIdFromUrl(item.url);
    this.id = pokemonId;
    this.name = item.name;
    this.thumbnail = getPokemonThumbnailUrl(pokemonId);
  }
}

export default Pokemon;
