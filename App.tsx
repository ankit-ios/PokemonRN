import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

import PokemonListScreen from "./src/components/pages/PokemonListScreen";
import PokemonDetailScreen from "./src/components/pages/PokemonDetailScreen";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const navigationOptions: any = {
  headerStyle: {
    backgroundColor: "#02292edb",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default function App() {
  useReactQueryDevTools(queryClient);
  return (
    <>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={navigationOptions}>
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
