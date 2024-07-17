import { getPokemonIdFromUrl, getPokemonThumbnailUrl } from "../helpers/utils";

interface PokemonProps {
  url: string;
  name: string;
}
class Pokemon {
  id: number;
  name: string;
  thumbnail: string;

  constructor(item: PokemonProps) {
    const pokemonId = getPokemonIdFromUrl(item.url);
    this.id = pokemonId;
    this.name = item.name.toUpperCase();
    this.thumbnail = getPokemonThumbnailUrl(pokemonId);
  }
}

export default Pokemon;
