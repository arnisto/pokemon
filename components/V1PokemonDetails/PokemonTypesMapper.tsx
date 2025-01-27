import { JSX } from "react";

/**
 * Component that maps and displays Pokemon types
 * @param {Object} props - Component props
 * @param {Array<{type: {name: string}}>} props.types - Array of Pokemon types
 * @param {string} props.backgroundColor - CSS class for background color
 * @returns {JSX.Element} Rendered Pokemon types
 */
function PokemonTypesMapper({
  types,
  backgroundColor,
}: {
  types: Array<{ type: { name: string } }>;
  backgroundColor: string;
}): JSX.Element {
  return (
    <div className="flex justify-center space-x-2 mb-6">
      {types.map((type, index) => (
        <span
          key={index}
          className={`px-4 py-2 ${backgroundColor} text-white rounded-full text-sm font-semibold capitalize`}
        >
          {type.type.name}
        </span>
      ))}
    </div>
  );
}

export default PokemonTypesMapper;
