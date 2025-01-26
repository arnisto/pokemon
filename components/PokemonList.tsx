"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]); // List of Pokémon
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [totalPokemon, setTotalPokemon] = useState(0); // Total Pokémon count
  const [totalTypes, setTotalTypes] = useState(0); // Total types count
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [selectedType, setSelectedType] = useState(""); // Selected type filter
  const [types, setTypes] = useState([]); // List of all types
  const [pokemonDetails, setPokemonDetails] = useState<any>({}); // Pokémon details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const itemsPerPage = 20; // Number of Pokémon per page

  // Fetch global data (total Pokémon and types)
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const pokemonResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon"
        );
        const typesResponse = await axios.get("https://pokeapi.co/api/v2/type");
        setTotalPokemon(pokemonResponse.data.count);
        setTotalTypes(typesResponse.data.count);
        setTypes(typesResponse.data.results);
      } catch (error) {
        console.error("Error fetching global data:", error);
      }
    };

    fetchGlobalData();
  }, []);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
        );
        setPokemonList(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));

        // Fetch details for each Pokémon
        const details: any = {};
        for (const pokemon of response.data.results) {
          const detailResponse = await axios.get(pokemon.url);
          details[pokemon.name] = detailResponse.data;
        }
        setPokemonDetails(details);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filter Pokémon by search term and type
  const filteredPokemonList = pokemonList
    .filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((pokemon: any) =>
      selectedType
        ? pokemonDetails[pokemon.name]?.types.some(
            (type: any) => type.type.name === selectedType
          )
        : true
    );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>

        {/* Global Information */}
        <div className=" mb-8">
          <h1 className="text-3xl font-bold mb-4">Pokémon List</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Total Pokémon: <span className="font-bold">{totalPokemon}</span>
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Total Types: <span className="font-bold">{totalTypes}</span>
          </p>
        </div>
        {/* Filters */}
        <div className="flex w-full min-w-max gap-10 flex-wrap  ">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Type Filter */}
          <div className="mb-6">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Types</option>
              {types.map((type: { name: string }) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Pokémon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPokemonList.map(
                (pokemon: { name: string; id: string }, index) => (
                  <Link
                    key={index}
                    href={`/v1/pokemon/${
                      index + 1 + (currentPage - 1) * itemsPerPage
                    }`}
                  >
                    <motion.div
                      key={pokemon.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={
                          pokemonDetails[pokemon.name]?.sprites.other[
                            "official-artwork"
                          ].front_default ||
                          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                            (currentPage - 1) * itemsPerPage + index + 1
                          }.png`
                        }
                        alt={pokemon.name}
                        className="mx-auto w-40 h-40"
                      />
                      <h2 className="text-xl font-semibold mt-4 capitalize">
                        {pokemon.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        #{index + 1 + (currentPage - 1) * itemsPerPage}
                      </p>
                      <div className="mt-2">
                        {pokemonDetails[pokemon.name]?.types.map(
                          (type, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-1 dark:bg-blue-200 dark:text-blue-900"
                            >
                              {type.type.name}
                            </span>
                          )
                        )}
                      </div>
                    </motion.div>{" "}
                  </Link>
                )
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
