import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

import PokemonApi from "../../network-service/PokemonApi.js";
import ApiRequest from "../../network-service/ApiRequest.js";
import Pokemon from "../../models/Pokemon";
import { useInfiniteQuery } from "@tanstack/react-query";
import PokemonListItem from "../organisms/PokemonListItem";

function PokemonListScreen({ navigation }: { navigation: any }) {
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    initialPageParam: { offset: 0, limit: 20 },
    queryFn: ({ pageParam }) => ApiRequest(PokemonApi.LIST, pageParam),
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

  function pokemonListItemRenderer({ item: pokemon }) {
    return (
      <PokemonListItem pokemon={pokemon} onPress={pokemonListItemHandler} />
    );
  }

  function pokemonListItemHandler({ pokemon }) {
    navigation.navigate("PokemonDetailScreen", { pokemon });
  }

  const pokemons = data.pages
    .flatMap((item) => item.results)
    .map((item) => new Pokemon(item));

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 12, padding: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        data={pokemons}
        renderItem={pokemonListItemRenderer}
        numColumns={2}
        onEndReached={() => fetchNextPage()}
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
