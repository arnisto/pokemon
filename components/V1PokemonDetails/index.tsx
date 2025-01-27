"use client";

import { JSX, useEffect, useState } from "react";
import { Pokemon, PokemonSpecies } from "@/types/Pokemon";

import GoBack from "../@Pokedex/GoBack";
import Image from "next/image";
import PokemonDescription from "./PokemonDescription";
import PokemonTabContent from "./PokemonTabContent";
import PokemonTypesMapper from "./PokemonTypesMapper";
import TabButton from "../@Pokedex/TabButton";
import axios from "axios";
import { typeColors } from "@/utils";

const V1PokemonDetails = ({
  pokemonID,
}: {
  pokemonID: string;
}): JSX.Element => {
  const id = pokemonID;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [activeTab, setActiveTab] = useState<"stats" | "evolutions" | "moves">(
    "stats"
  );
  const [evolutionChainUrl, setEvolutionChainUrl] = useState<string>("");

  /**
   * Fetches Pokemon data and species information
   */
  useEffect(() => {
    if (id) {
      const fetchPokemon = async () => {
        try {
          const response = await axios.get<Pokemon>(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          setPokemon(response.data);

          const speciesResponse = await axios.get<PokemonSpecies>(
            response.data.species.url
          );
          setSpecies(speciesResponse.data);
          setEvolutionChainUrl(speciesResponse.data.evolution_chain.url);
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        }
      };

      fetchPokemon();
    }
  }, [id]);

  if (!pokemon || !species) {
    return <div>Loading...</div>;
  }

  const primaryType = pokemon.types[0].type.name;
  const backgroundColor: string = typeColors[primaryType] || "bg-gray-200";

  return (
    <div className={`min-h-screen p-20 ${backgroundColor}`}>
      <GoBack />
      <br />
      <div className="relative max-w-4xl mt-10 mx-auto bg-white rounded-2xl shadow-lg p-20">
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            width={192}
            height={192}
            className="w-48 h-48"
          />
        </div>
        <h1 className="text-4xl p-5 font-bold text-center capitalize mb-4">
          {pokemon.name}
        </h1>

        <PokemonTypesMapper
          types={pokemon.types}
          backgroundColor={backgroundColor}
        />

        <PokemonDescription entries={species.flavor_text_entries} />

        <div className="flex justify-center space-x-4 mb-6">
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            backgroundColor={backgroundColor}
            tabName="stats"
          />
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            backgroundColor={backgroundColor}
            tabName="evolutions"
          />
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            backgroundColor={backgroundColor}
            tabName="moves"
          />
        </div>

        <PokemonTabContent
          pokemon={pokemon}
          activeTab={activeTab}
          evolutionChainUrl={evolutionChainUrl}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
};

export default V1PokemonDetails;
