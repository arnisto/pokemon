/**
 * Interface for Pokemon stats
 */
export interface PokemonStat {
  stat: {
    name: string;
  };
  base_stat: number;
}

/**
 * Interface for Pokemon types
 */
export interface PokemonType {
  type: {
    name: string;
  };
}

/**
 * Interface for Pokemon moves
 */
export interface PokemonMove {
  move: {
    name: string;
  };
  version_group_details: {
    level_learned_at: number;
  }[];
}

/**
 * Interface for Pokemon species flavor text
 */
interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

/**
 * Interface for Pokemon data
 */
export interface Pokemon {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
    front_default: string;
  };
  types: PokemonType[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  species: {
    url: string;
  };
}

/**
 * Interface for Pokemon species data
 */
export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
}
