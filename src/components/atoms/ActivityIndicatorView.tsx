import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

interface ActivityIndicatorProps {
  size?: number | "small" | "large" | undefined;
  color?: string;
  style?: any;
}

const ActivityIndicatorView = ({
  size = "large",
  color = "#fff",
  style = [],
}: ActivityIndicatorProps) => {
  return (
    <ActivityIndicator
      testID="activity-indicator"
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
