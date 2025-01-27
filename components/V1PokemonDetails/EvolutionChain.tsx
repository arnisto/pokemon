"use client";

// Types for the evolution chain data
type Pokemon = {
  name: string;
  url: string;
};

type EvolutionChainProps = {
  /** The URL to fetch the evolution chain data from */
  evolutionChainUrl: string;
  /** The background color for the evolution arrows */
  backgroundColor: string;
};

type ChainLink = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainLink[];
};

import { useEffect, useState } from "react";

import Image from "next/image";
import axios from "axios";

/**
 * Component that displays a Pokémon's evolution chain
 * @param {EvolutionChainProps} props - The component props
 * @returns {JSX.Element} The rendered evolution chain
 */
const EvolutionChain = ({
  evolutionChainUrl,
  backgroundColor,
}: EvolutionChainProps) => {
  const [evolutionChain, setEvolutionChain] = useState<Pokemon[]>([]);

  /**
   * Fetches the evolution chain data from the API
   */
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

  /**
   * Parses the evolution chain data into a flat array
   * @param {ChainLink} chain - The evolution chain data
   * @returns {Pokemon[]} Array of Pokémon in the evolution chain
   */
  const parseEvolutionChain = (chain: ChainLink): Pokemon[] => {
    const evolutionChain: Pokemon[] = [];
    let current: ChainLink | null = chain;

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
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url
                .split("/")
                .slice(-2, -1)}.png`}
              alt={pokemon.name}
              width={96}
              height={96}
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
