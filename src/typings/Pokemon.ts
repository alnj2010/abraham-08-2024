export type PokeStatType =
  | 'speed'
  | 'special-defense'
  | 'special-attack'
  | 'defense'
  | 'attack'
  | 'hp'

export type PokeTypes =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
  | 'stellar'
  | 'unknown'

export type PokemonType = { type: PokeTypes; color: string }

export type PokeStat = { type: string; baseStat: number }
export type EvolutionChain = {
  evolves_to: Array<EvolutionChain>
  species: {
    name: string
  }
}

export interface PokemonBasicInfo {
  id: number
  name: string
  image: { small: string; big: string }
  cries: string
  types: Array<PokemonType>
  height: number
  weight: number
  stats: Array<PokeStat>
  color: string
}

export interface PokemonFullInfo extends PokemonBasicInfo {
  evolutionChain: EvolutionChain
  description: string
}
