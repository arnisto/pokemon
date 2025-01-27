/**
 * Component to display a list of Pokemon moves
 * @param {Object} props - Component props
 * @param {Object} props.pokemon - Pokemon data object
 * @param {Array<{move: {name: string}, version_group_details: Array<{level_learned_at: number}>}>} props.pokemon.moves - Array of move data
 * @returns {JSX.Element} Pokemon moves component
 */
const PokemonMoves = (props: {
  pokemon: {
    moves: Array<{
      move: {
        name: string;
      };
      version_group_details: Array<{
        level_learned_at: number;
      }>;
    }>;
  };
}) => {
  const { pokemon } = props;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Moves (Total {pokemon.moves?.length || 0})
      </h2>
      <div className="space-y-2">
        {pokemon.moves.map((move, index) => (
          <div key={index} className="p-2 border-b border-gray-200">
            <div className="">
              <span className="capitalize">{move.move.name}</span>
              <br />
              <span className="text-gray-500 text-sm opacity-70">
                Level: {move.version_group_details[0].level_learned_at}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonMoves;
