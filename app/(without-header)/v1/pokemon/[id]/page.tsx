import V1PokemonDetails from "@/components/V1PokemonDetails";

const PokemonDetails = (props) => {
  const { params } = props;
  const { id } = params;
  return (
    <>
      <V1PokemonDetails pokemonID={id} />
    </>
  );
};

export default PokemonDetails;
