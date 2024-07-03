import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

import PokemonApi from "../utils/api/PokemonApi.js";
import apiRequest from "../utils/api/apiRequest.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import PokemonListItem from "../components/PokemonList/PokemonListItem.js";

function PokemonListScreen({ navigation }) {
  ///tanstack -> useQuery
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["pokemon"],
  //   queryFn: fetchPokemons,
  // });

  // const fetchPokemons = async ( pageParam: number ) => {
  //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=20`)
  //   return res.json()
  // }

  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    initialPageParam: { offset: 0, limit: 20 },
    queryFn: ({ pageParam }) => apiRequest(PokemonApi.LIST, pageParam),
    getNextPageParam: (lastPage, pages) => {
      const nextOffset = pages.length * 20;
      return { offset: nextOffset, limit: 20 };
    },
  });

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color="#02292edb"
      />
    );
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  function pokemonListItemRenderer({ item }) {
    return <PokemonListItem item={item} onPress={pokemonListItemHandler} />;
  }

  function pokemonListItemHandler({ pokemonId }) {
    navigation.navigate("PokemonDetailScreen", { pokemonId });
  }

  const pokemons = data.pages.flatMap((item) => item.results);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={pokemons}
        renderItem={pokemonListItemRenderer}
        numColumns={"2"}
        onEndReached={fetchNextPage}
      />
    </View>
  );
}

export default PokemonListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
