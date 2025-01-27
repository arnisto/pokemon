/**
 * V0Home Component - Main search interface for the Pokédex
 * @returns {JSX.Element} The rendered V0Home component
 */
"use client";

import { JSX, useState } from "react";

import Button from "./@Pokedex/Button";
import Image from "next/image";
import TextInput from "./@Pokedex/TextInput";
import WhiteCard from "./@Pokedex/WhiteCard";
import axios from "axios";
import { useRouter } from "next/navigation";

const V0Home = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term (name or ID)
  const [error, setError] = useState<string>(""); // Error message

  const router = useRouter();

  /**
   * Fetches Pokémon data from the PokeAPI by name or ID
   * @param {string} term - The search term (Pokémon name or ID)
   */
  const fetchPokemon = async (term: string): Promise<void> => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
      );
      setError("");
      router.push("/v1/pokemon/" + response.data.id);
    } catch (err) {
      console.error(err);
      setError("Pokémon not found!");
      router.push("/v1/pokemon/not-found");
    }
  };

  /**
   * Handles the search button click event
   */
  const handleSearch = (): void => {
    if (searchTerm) {
      fetchPokemon(searchTerm);
    }
  };

  /**
   * Handles the random Pokémon button click event
   */
  const handleRandom = (): void => {
    const randomId = Math.floor(Math.random() * 800) + 1; // Random ID between 1 and 800
    fetchPokemon(randomId.toString());
  };

  return (
    <WhiteCard>
      {/* Updated Poké Ball Image */}
      <Image
        src="/Pokeball.png"
        alt="Poké Ball"
        className="w-24 h-24 mx-auto mb-6"
        width={100}
        height={100}
      />

      {/* Search Input */}
      <TextInput
        placeholder="Enter Pokémon name or ID..."
        value={searchTerm}
        onChange={setSearchTerm}
        error={error}
      />

      {/* Buttons */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handleSearch} variant="primary">
          Search
        </Button>
        <Button onClick={handleRandom} variant="secondary">
          Random
        </Button>
      </div>
    </WhiteCard>
  );
};

export default V0Home;
