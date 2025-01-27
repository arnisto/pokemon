"use client";

import { useEffect, useState } from "react";

import axios from "axios";

// Fetch Pokémon data from PokeAPI
async function fetchPokemonData() {
  const pokemonList = [];
  for (let i = 1; i <= 151; i++) {
    // Fetch first 151 Pokémon (Gen 1)
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemon = res.data;
    const stats = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0); // Calculate total stats
    pokemonList.push({ ...pokemon, totalStats: stats });
  }
  return pokemonList;
}

export default function TopPokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [sortBy, setSortBy] = useState("totalStats"); // Default sorting by total stats

  useEffect(() => {
    fetchPokemonData().then((data) => {
      setPokemonList(data);
    });
  }, []);

  // Sort Pokémon by selected stat
  const sortedPokemon = [...pokemonList].sort((a, b) => {
    if (sortBy === "totalStats") {
      return b.totalStats - a.totalStats;
    } else {
      const statA = a.stats.find((stat) => stat.stat.name === sortBy).base_stat;
      const statB = b.stats.find((stat) => stat.stat.name === sortBy).base_stat;
      return statB - statA;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Top Pokémon by Strength
        </h1>
        <div className="mb-6">
          <label className="mr-2 font-semibold">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="totalStats">Total Stats</option>
            <option value="hp">HP</option>
            <option value="attack">Attack</option>
            <option value="defense">Defense</option>
            <option value="special-attack">Special Attack</option>
            <option value="special-defense">Special Defense</option>
            <option value="speed">Speed</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPokemon.slice(0, 30).map(
            (
              pokemon // Display top 30 Pokémon
            ) => (
              <div
                key={pokemon.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-16 h-16"
                  />
                  <div>
                    <h2 className="text-xl font-semibold capitalize">
                      {pokemon.name}
                    </h2>
                    <p className="text-gray-600">
                      Total Stats: {pokemon.totalStats}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center">
                      <span className="w-24 font-medium capitalize">
                        {stat.stat.name}:
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }} // Normalize stat value
                        ></div>
                      </div>
                      <span className="w-8 text-right">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
