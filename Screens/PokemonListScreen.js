import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

import PokemonApi  from "../utils/api/PokemonApi.js";
import  apiRequest  from "../utils/api/apiRequest.js";
import { useQuery } from "@tanstack/react-query";
import PokemonListItem from "../components/PokemonList/PokemonListItem.js";

function PokemonListScreen({ navigation }) {
  ///tanstack -> useQuery
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["pokemon"],
  //   queryFn: fetchPokemons,
  // });

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonList", { offset: 0, limit: 20 }],
    queryFn: ( { queryKey}) => apiRequest(PokemonApi.LIST, queryKey[1])
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
    console.log(pokemonId);
    navigation.navigate("PokemonDetailScreen", { pokemonId });
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data.results}
        renderItem={pokemonListItemRenderer}
        numColumns={"2"}
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
