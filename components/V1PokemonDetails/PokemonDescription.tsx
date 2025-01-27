import { JSX } from "react";

/**
 * Component that displays a Pokemon's description in English
 * @param {Object} props - Component props
 * @param {Array<{language: {name: string}, flavor_text: string}>} props.entries - Array of flavor text entries in different languages
 * @returns {JSX.Element} A paragraph element containing the Pokemon's description
 */
function PokemonDescription(props: {
  entries: Array<{ language: { name: string }; flavor_text: string }>;
}): JSX.Element {
  const { entries } = props;
  return (
    <p className="text-center text-gray-700 mb-8">
      {entries.find((entry) => entry.language.name === "en")?.flavor_text ||
        "No description available."}
    </p>
  );
}

export default PokemonDescription;
