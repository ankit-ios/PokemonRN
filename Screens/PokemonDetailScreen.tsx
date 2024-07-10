import { useEffect, useState } from "react"; // Update to useState for type safety
import { View, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";

import ActivityIndicatorView from "../components/ActivityIndicatorView";
import PokemonSpecies from "../components/PokemonDetail/PokemonSpecies";
import PokemonApi from "../utils/api/PokemonApi";
import ApiRequest from "../utils/api/ApiRequest";

interface PokemonProps {
  name: string;
  id: number;
}

// create a component
function PokemonDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const pokemon: PokemonProps = route.params.pokemon; // Specify type for pokemon

  useEffect(() => {
    navigation.setOptions({
      title: pokemon.name,
    });
  }, [navigation, pokemon.name]);

  const {
    data: pokemonDetailData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemonDetail", { pokemonId: pokemon.id }],
    queryFn: ({ queryKey }) => ApiRequest(PokemonApi.DETAIL, queryKey[1]),
  });

  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicatorView />
    </View>
  ) : error ? (
    <View>{error.message}</View>
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <PokemonSpecies pokemon={pokemon} />
      </View>
      <View style={{ flex: 5 }}></View>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#45a4b1",
  },
  header: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    height: "30%",
  },
});

//make this component available to the app
export default PokemonDetailScreen;
