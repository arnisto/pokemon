"use client";

import { useEffect, useState } from "react";

import EvolutionChain from "./EvolutionChain"; // Import the EvolutionChain component
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const V1PokemonDetails = ({ pokemonID }: { pokemonID: string }) => {
  const id = pokemonID;
  const [pokemon, setPokemon] = useState(null); // Pokémon details
  const [species, setSpecies] = useState(null); // Species details (for description)
  const [activeTab, setActiveTab] = useState("stats"); // Active tab state
  const [evolutionChainUrl, setEvolutionChainUrl] = useState(""); // Evolution chain URL

  // Fetch Pokémon details
  useEffect(() => {
    if (id) {
      const fetchPokemon = async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          setPokemon(response.data);

          // Fetch species data for description and evolution chain
          const speciesResponse = await axios.get(response.data.species.url);
          setSpecies(speciesResponse.data);

          // Set evolution chain URL
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

  // Get the primary type for background color
  const primaryType = pokemon.types[0].type.name;

  // Background color based on Pokémon type
  const typeColors = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400",
    psychic: "bg-purple-500",
    ice: "bg-blue-200",
    dragon: "bg-indigo-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    normal: "bg-gray-400",
    fighting: "bg-red-700",
    flying: "bg-blue-300",
    poison: "bg-purple-700",
    ground: "bg-yellow-700",
    rock: "bg-yellow-800",
    bug: "bg-green-600",
    ghost: "bg-indigo-800",
    steel: "bg-gray-500",
  };

  const backgroundColor = typeColors[primaryType] || "bg-gray-200";

  return (
    <div className={`min-h-screen p-20 ${backgroundColor}`}>
      <Link href="/v1">
        <Image src="/Path.png" alt="Go Back" width={40} height={40} />
      </Link>
      <br />
      <div className="relative max-w-4xl mt-10 mx-auto bg-white rounded-2xl shadow-lg p-20">
        {/* Pokémon Image */}
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="w-48 h-48"
          />
        </div>
        {/* Pokémon Name */}
        <h1 className="text-4xl p-5 font-bold text-center capitalize mb-4">
          {pokemon.name}
        </h1>

        {/* Pokémon Types */}
        <div className="flex justify-center space-x-2 mb-6">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className={`px-4 py-2 ${backgroundColor} text-white rounded-full text-sm font-semibold capitalize`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        {/* Pokémon Description */}
        <p className="text-center text-gray-700 mb-8">
          {species.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          )?.flavor_text || "No description available."}
        </p>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 rounded-2xl ${
              activeTab === "stats"
                ? `${backgroundColor} text-white`
                : "bg-gray-200"
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab("evolutions")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "evolutions"
                ? `${backgroundColor} text-white`
                : "bg-gray-200"
            }`}
          >
            Evolutions
          </button>
          <button
            onClick={() => setActiveTab("moves")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "moves"
                ? `${backgroundColor} text-white`
                : "bg-gray-200"
            }`}
          >
            Moves
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "stats" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Stats</h2>
              <div className="space-y-2">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-32 font-semibold capitalize">
                      {stat.stat.name}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className={`${backgroundColor} h-4 rounded-full`}
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "evolutions" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Evolutions</h2>
              <EvolutionChain
                evolutionChainUrl={evolutionChainUrl}
                backgroundColor={backgroundColor}
              />
            </div>
          )}

          {activeTab === "moves" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Moves (Total {pokemon.moves?.length || 0})
              </h2>
              <div className="space-y-2">
                {pokemon.moves.map((move, index) => (
                  <div key={index} className="p-2 border-b border-gray-200">
                    <div className="">
                      <span className="capitalize">{move.move.name}</span>
                      <br />
                      <span className="text-gray-500 text-sm opacity-70">
                        Level: {move.version_group_details[0].level_learned_at}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default V1PokemonDetails;
