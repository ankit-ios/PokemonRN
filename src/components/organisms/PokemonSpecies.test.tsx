import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { useQuery } from "@tanstack/react-query";
import PokemonSpecies from "./PokemonSpecies";
import Pokemon from "../../models/Pokemon";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../atoms/ActivityIndicatorView", () => jest.fn(() => null));
jest.mock("../atoms/ImageView", () => jest.fn(() => null));

const mockPokemon = new Pokemon({
  id: 1,
  name: "Bulbasaur",
  url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
});

describe("PokemonSpecies Component", () => {
  it("displays loading indicator when data is loading", () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = render(<PokemonSpecies pokemon={mockPokemon} />);
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("displays error message when there is an error", async () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Network error" },
    });

    const { getByText } = render(<PokemonSpecies pokemon={mockPokemon} />);
    await waitFor(() => {
      expect(
        getByText("Error loading species data: Network error")
      ).toBeTruthy();
    });
  });

  it("displays species data when loaded", async () => {
    useQuery.mockReturnValue({
      data: {
        flavor_text_entries: [
          {
            flavor_text: "A strange seed was planted on its back at birth.",
            language: { name: "en" },
          },
          {
            flavor_text: "The plant sprouts and grows with this Pokémon.",
            language: { name: "en" },
          },
        ],
      },
      isLoading: false,
      error: null,
    });

    const { getByText } = render(<PokemonSpecies pokemon={mockPokemon} />);
    await waitFor(() => {
      expect(
        getByText(
          "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon."
        )
      ).toBeTruthy();
    });
  });
});
