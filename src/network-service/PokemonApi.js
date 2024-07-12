const PokemonApi = {
    LIST: "list",
    DETAIL: "detail",
    GENDER: "gender",
    SPECIES: "species",
    TYPE: "type",
    EVOLUTION_CHAIN: "evolutionChain",
  
    endpoint: (type, params) => {
      switch (type) {
        case PokemonApi.LIST:
          return `/pokemon`;
        case PokemonApi.DETAIL:
          return `/pokemon/${params.pokemonId}`;
        case PokemonApi.GENDER:
          return `/gender/${params.type}`;
        case PokemonApi.SPECIES:
          return `/pokemon-species/${params.pokemonId}`;
        case PokemonApi.TYPE:
          return `/type/${params.pokemonId}`;
        case PokemonApi.EVOLUTION_CHAIN:
          return `/evolution-chain/${params.pokemonId}`;
        default:
          return "";
      }
    },
  
    requestParameters: (type, params) => {
      switch (type) {
        case PokemonApi.LIST:
          return {
            offset: params.offset,
            limit: params.limit,
          };
        default:
          return null;
      }
    },
  };
  
  export default PokemonApi;
  