import EvolutionChain from "./EvolutionChain";
import { JSX } from "react";

/**
 * Component that displays Pokemon evolution chain
 * @param {Object} props - Component props
 * @param {string} props.evolutionChainUrl - URL for the Pokemon evolution chain data
 * @param {string} props.backgroundColor - Background color for the evolution chain display
 * @returns {JSX.Element} Pokemon evolutions component
 */
const PokemonEvolutions = (props: {
  evolutionChainUrl: string;
  backgroundColor: string;
}): JSX.Element => {
  const { evolutionChainUrl, backgroundColor } = props;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Evolutions</h2>
      <EvolutionChain
        evolutionChainUrl={evolutionChainUrl}
        backgroundColor={backgroundColor}
      />
    </div>
  );
};

export default PokemonEvolutions;
