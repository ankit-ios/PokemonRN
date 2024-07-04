import { ActivityIndicator, StyleSheet } from "react-native";

const ActivityIndicatorView = ({
  size = "large",
  color = "#fff",
  style,
}) => {
  return (
    <ActivityIndicator
      style={[styles.activityIndicator, style]}
      size={size}
      color={color}
    />
  );
};

const styles = StyleSheet.create({
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

export default ActivityIndicatorView;
