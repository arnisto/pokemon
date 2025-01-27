import { JSX } from "react";
import { Pokemon } from "@/types/Pokemon";
import PokemonEvolutions from "./PokemonEvolutions";
import PokemonMoves from "./PokemonMoves";
import PokemonStatistics from "./PokemonStatistics";

interface PokemonTabContentProps {
  pokemon: Pokemon;
  activeTab: "stats" | "evolutions" | "moves";
  backgroundColor: string;
  evolutionChainUrl: string;
}

/**
 * Renders the content for different Pokemon tabs based on the active tab selection
 * @param {PokemonTabContentProps} props - The component props
 * @param {Pokemon} props.pokemon - The Pokemon data object
 * @param {"stats" | "evolutions" | "moves"} props.activeTab - The currently active tab
 * @param {string} props.backgroundColor - The background color for styling
 * @param {string} props.evolutionChainUrl - The URL for fetching evolution chain data
 * @returns {JSX.Element} The rendered tab content
 */
function PokemonTabContent(props: PokemonTabContentProps): JSX.Element {
  const { pokemon, activeTab, backgroundColor, evolutionChainUrl } = props;
  return (
    <div className="mt-6">
      {activeTab === "stats" && (
        <PokemonStatistics
          stats={pokemon.stats}
          backgroundColor={backgroundColor}
        />
      )}

      {activeTab === "evolutions" && (
        <PokemonEvolutions
          evolutionChainUrl={evolutionChainUrl}
          backgroundColor={backgroundColor}
        />
      )}

      {activeTab === "moves" && <PokemonMoves pokemon={pokemon} />}
    </div>
  );
}

export default PokemonTabContent;
