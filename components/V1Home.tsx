"use client";

import axios from "axios";
import { useState } from "react";

const V1Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Search term (name or ID)
  const [pokemon, setPokemon] = useState<any>(null); // Pokémon data
  const [error, setError] = useState(""); // Error message

  // Fetch Pokémon by name or ID
  const fetchPokemon = async (term: any) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
      );
      setPokemon(response.data);
      setError("");
    } catch (err) {
      setPokemon(null);
      setError("Pokémon not found!");
    }
  };

  // Handle search
  const handleSearch = () => {
    if (searchTerm) {
      fetchPokemon(searchTerm);
    }
  };

  // Handle random Pokémon
  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Random ID between 1 and 898
    fetchPokemon(randomId);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom left, red 0%, red 50%, white 50%, white 100%)",
      }}
    >
      {/* Black Diagonal Line (Top-Right to Bottom-Left) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom left, transparent 49%, black 49%, black 51%, transparent 51%)",
          zIndex: 1,
        }}
      ></div>

      {/* White Card */}
      <div
        className="bg-white p-8 rounded-lg shadow-2xl text-center w-96 relative z-10"
        style={{ zIndex: 2 }}
      >
        {/* Updated Poké Ball Image */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
          alt="Poké Ball"
          className="w-24 h-24 mx-auto mb-6"
        />

        {/* Search Input */}
        <input
          type="text"
          placeholder="Enter Pokémon name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Search
          </button>
          <button
            onClick={handleRandom}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Random
          </button>
        </div>

        {/* Display Pokémon */}
        {pokemon && (
          <div className="mt-6">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-24 h-24 mx-auto"
            />
            <h2 className="text-xl font-bold capitalize mt-2">
              {pokemon.name}
            </h2>
            <p className="text-gray-600">#{pokemon.id}</p>
            <div className="mt-2">
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className="inline-block bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full mr-1"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Display Error */}
        {error && <div className="mt-6 text-red-500 font-bold">{error}</div>}
      </div>

      {/* Pikachu Image (Bottom-Right of Screen) */}
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        alt="Pikachu"
        className="w-40 h-40 absolute bottom-0 right-0 z-20"
      />
    </div>
  );
};

export default V1Home;
