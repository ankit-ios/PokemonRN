import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useReactQueryDevTools } from '@dev-plugins/react-query';

import PokemonListScreen from "./Screens/PokemonListScreen";
import PokemonDetailScreen from "./Screens/PokemonDetailScreen";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  useReactQueryDevTools(queryClient);
  return (
    <>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={styles.header}>
            <Stack.Screen name="All Pokemons" component={PokemonListScreen} />
            <Stack.Screen
              name="PokemonDetailScreen"
              component={PokemonDetailScreen}
              options={{ headerBackTitleVisible: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    headerStyle: {
      backgroundColor: "#02292edb",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  },
});
