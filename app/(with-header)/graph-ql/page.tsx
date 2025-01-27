"use client";

import Image from "next/image";
import client from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useState } from "react";

const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      base_experience
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export default function GraphQLPage() {
  const limit = 10; // Number of Pokémon per page
  const [offset, setOffset] = useState(0); // Pagination offset
  const [pokemons, setPokemons] = useState([]);

  const fetchData = async (currentOffset: number) => {
    const { data } = await client.query({
      query: GET_POKEMONS,
      variables: { limit, offset: currentOffset },
      fetchPolicy: "no-cache",
    });
    setPokemons(data.pokemon_v2_pokemon);
    return data.pokemon_v2_pokemon;
  };

  fetchData(offset);

  // Handlers for pagination
  const handleNextPage = () => setOffset(offset + limit);
  const handlePrevPage = () =>
    setOffset(offset - limit < 0 ? 0 : offset - limit);

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">Pokémon List with GraphQL</h1>

      {/* Informative Section */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">About This Page</h2>
        <p className="text-gray-700 mb-2">
          This page demonstrates how to fetch data using the
          <span className="text-blue-500 font-medium">
            {" "}
            Pokémon GraphQL API
          </span>
          . Unlike RESTful APIs, GraphQL allows querying for specific fields,
          which makes data fetching more precise and efficient.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>API Endpoint:</strong>
          <a
            href="https://beta.pokeapi.co/graphql/v1beta"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://beta.pokeapi.co/graphql/v1beta
          </a>
        </p>
        <p className="text-gray-700">
          <strong>Query:</strong>
        </p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {`
query GetPokemons($limit: Int!, $offset: Int!) {
  pokemon_v2_pokemon(limit: $limit, offset: $offset) {
    id
    name
    base_experience
    pokemon_v2_pokemonsprites {
      sprites
    }
  }
}`}
        </pre>
      </div>

      {/* Pokémon List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pokemons.map((pokemon) => {
          //   const sprite = JSON.parse(
          //     pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites || "{}"
          //   ).front_default;
          return (
            <li
              key={pokemon.id}
              className="flex flex-wrap border rounded-xl p-4 shadow hover:shadow-md"
            >
              <Image
                src={
                  pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites.other[
                    "official-artwork"
                  ].front_default ||
                  pokemon.pokemon_v2_pokemonsprites?.[0]?.sprites.front_default
                }
                alt={pokemon.name}
                width={192}
                height={192}
                className="w-48 h-48"
              />
              <div>
                <h2 className="font-semibold text-lg">{pokemon.name}</h2>
                <p>ID: {pokemon.id}</p>
                <p>Base Experience: {pokemon.base_experience}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
            offset === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={offset === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
