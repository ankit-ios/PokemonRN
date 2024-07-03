//import liraries
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  getPokemonIdFromUrl,
  getPokemonThumbnailUrl,
} from "../../utils/helper";
import { useState } from "react";

// create a component
function PokemonListItem({ item, onPress }) {
  const pokemonId = getPokemonIdFromUrl(item.url);
  const imageUrl = getPokemonThumbnailUrl(pokemonId);
  const [loading, setLoading] = useState(true);

  function onPressHandler() {
    onPress({ pokemonId });
  }

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.card,
          pressed ? styles.cardPressed : null,
        ]}
        onPress={onPressHandler}
      >
        <View style={styles.innerContainer}>
          {loading && (
            <ActivityIndicator style={styles.activityIndicator} size="large" color="#fff" />
          )}
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onLoad={handleImageLoad}
          />
          <Text style={styles.title}>{item.name.toUpperCase()}</Text>
        </View>
      </Pressable>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    margin: 12,
  },
  outerContainer: {
    flex: 1,
    margin: 16,
    height: 200,
    borderRadius: 8,
    backgroundColor: "45a4b1",
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
  image: {
    height: 140,
    width: 120,
    padding: 8,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: 16,
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

//make this component available to the app
export default PokemonListItem;
