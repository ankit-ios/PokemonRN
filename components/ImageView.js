import { View, Image, StyleSheet } from "react-native";
import { useState } from "react";
import ActivityIndicatorView from "./ActivityIndicatorView";

// create a component
const ImageView = ({ imageUrl, imageStyle }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicatorView />}
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, imageStyle]}
        resizeMode="cover"
        onLoad={handleImageLoad}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 8,
  },
  image: {
    justifyContent: "center",
    alignContent: "center",
    height: 140,
    width: 120,
  },
});

//make this component available to the app
export default ImageView;
