import V1PokemonDetails from "@/components/V1PokemonDetails";

const PokemonDetails = (props) => {
  const { params } = props;
  const { id } = params;
  return (
    <div>
      <V1PokemonDetails pokemonID={id} />
    </div>
  );
};

export default PokemonDetails;
