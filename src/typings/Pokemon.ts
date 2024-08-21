export type PokeStatType =
  | 'speed'
  | 'special-defense'
  | 'special-attack'
  | 'defense'
  | 'attack'
  | 'hp'

export type PokeStat = { type: PokeStatType; baseStat: number }
export type Evolution = {
  evolves_to: EvolutionChain
  species: {
    name: string
  }
}
export type EvolutionChain = Array<Evolution>

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
