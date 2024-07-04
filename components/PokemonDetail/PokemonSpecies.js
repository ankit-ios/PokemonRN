//import liraries
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";

import PokemonApi from "../../utils/api/PokemonApi";
import ApiRequest from "../../utils/api/ApiRequest";
import ActivityIndicatorView from "../ActivityIndicatorView";
import ImageView from "../ImageView";

// create a component
const PokemonSpecies = ({ pokemon }) => {
  const {
    data: species,
    isLoading: isSpeciesLoading,
    error: speciesAPIError,
  } = useQuery({
    queryKey: ["pokemonSpecies", { pokemonId: pokemon.id }],
    queryFn: ({ queryKey }) => ApiRequest(PokemonApi.SPECIES, queryKey[1]),
  });
  if (isSpeciesLoading) {
    return (
      <View>
        <ActivityIndicatorView />
      </View>
    );
  }

  if (speciesAPIError) {
    return (
      <View>
        <Text>Error loading species data: {speciesAPIError.message}</Text>
      </View>
    );
  }

  console.log("species => " + species);
  const flavorTextEntries = Array.isArray(species.flavor_text_entries)
    ? species.flavor_text_entries
    : [];
  const allEnglishFlavorTexts = flavorTextEntries.filter(
    (entry) => entry.language.name === "en"
  );
  const englishFlavorTexts = allEnglishFlavorTexts
    .map((entry) => entry.flavor_text)
    .join(" ");

  console.log(englishFlavorTexts);

  return isSpeciesLoading ? (
    <ActivityIndicatorView />
  ) : speciesAPIError ? (
    <View>error.message</View>
  ) : (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ImageView imageUrl={pokemon.thumbnail} />
        <Text styles={{ backgroundColor: "#c82222" }}>
          {englishFlavorTexts}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#45a4b1",
  },
  innerContainer: {
    marginTop: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

//make this component available to the app
export default PokemonSpecies;
