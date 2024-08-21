export type PokeStatType =
  | 'speed'
  | 'special-defense'
  | 'special-attack'
  | 'defense'
  | 'attack'
  | 'hp'

export type PokeStat = { type: PokeStatType; baseStat: number }
export type EvolutionChain = {
  evolves_to: Array<EvolutionChain>
  species: {
    name: string
  }
}

export interface PokemonBasicInfo {
  id: number
  name: string
  image: string
  cries: string
  types: Array<string>
  height: number
  weight: number
  stats: Array<PokeStat>
}

export interface PokemonFullInfo extends PokemonBasicInfo {
  description: string
  evolutionChain: EvolutionChain
}
