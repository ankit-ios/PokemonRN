import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PokemonListItem from "./PokemonListItem";
import Pokemon from "../../models/Pokemon";

const mockPokemon = new Pokemon({
  id: 1,
  name: "Bulbasaur",
  url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
});

const mockOnPress = jest.fn();

describe("PokemonListItem Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <PokemonListItem pokemon={mockPokemon} onPress={mockOnPress} />
    );
    expect(getByText("BULBASAUR")).toBeTruthy();
  });

  it("displays the correct pokemon name", () => {
    const { getByText } = render(
      <PokemonListItem pokemon={mockPokemon} onPress={mockOnPress} />
    );
    expect(getByText("BULBASAUR")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const { getByText } = render(
      <PokemonListItem pokemon={mockPokemon} onPress={mockOnPress} />
    );
    fireEvent.press(getByText("BULBASAUR"));
    expect(mockOnPress).toHaveBeenCalledWith({ pokemon: mockPokemon });
  });
});
