"use client";

import { useEffect, useState } from "react";

import axios from "axios";

const EvolutionChain = ({ evolutionChainUrl, backgroundColor }) => {
  const [evolutionChain, setEvolutionChain] = useState([]);

  // Fetch evolution chain data
  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        const response = await axios.get(evolutionChainUrl);
        const chain = parseEvolutionChain(response.data.chain);
        setEvolutionChain(chain);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      }
    };

    fetchEvolutionChain();
  }, [evolutionChainUrl]);

  // Helper function to parse the evolution chain
  const parseEvolutionChain = (chain) => {
    const evolutionChain = [];
    let current = chain;

    while (current) {
      evolutionChain.push({
        name: current.species.name,
        url: current.species.url,
      });

      if (current.evolves_to.length > 0) {
        current = current.evolves_to[0];
      } else {
        current = null;
      }
    }

    return evolutionChain;
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {evolutionChain.map((pokemon, index) => (
        <div key={pokemon.name} className="flex items-center">
          {/* Pokémon Image */}
          <div className="text-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url
                .split("/")
                .slice(-2, -1)}.png`}
              alt={pokemon.name}
              className="w-24 h-24"
            />
            <p className="capitalize text-sm mt-2">{pokemon.name}</p>
          </div>

          {/* Arrow (if not the last Pokémon) */}
          {index < evolutionChain.length - 1 && (
            <div className={`w-8 h-1 ${backgroundColor} mx-4`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EvolutionChain;
