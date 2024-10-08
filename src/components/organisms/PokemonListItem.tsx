//import liraries
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import ImageView from "../atoms/ImageView";
import Pokemon from "../../models/Pokemon";

interface PokemonListItemProps {
  pokemon: Pokemon;
  onPress: any;
}

// create a component
function PokemonListItem({ pokemon, onPress }: PokemonListItemProps) {
  const { id, name, thumbnail } = pokemon;

  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.card,
          pressed ? styles.cardPressed : null,
        ]}
        onPress={() => onPress({ pokemon })}
        testID="pressable-element"
      >
        <View style={styles.innerContainer}>
          <ImageView imageUrl={thumbnail} />
          <Text style={styles.title}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: "100%",
    aspectRatio: 4 / 5,
    borderRadius: 8,
    backgroundColor: "#45a4b1",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    overflow: Platform.OS === "ios" ? "visible" : "hidden",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#66b9c4db",
    borderRadius: 8,
  },
  cardPressed: {
    opacity: 0.5,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: 8,
  },
});

//make this component available to the app
export default PokemonListItem;
