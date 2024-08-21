export type PokeStatType =
  | 'speed'
  | 'special-defense'
  | 'special-attack'
  | 'defense'
  | 'attack'
  | 'hp'

export type PokeStat = { type: PokeStatType; baseStat: number }

export interface Pokemon {
  name: string
  image: string
  cries: string
  types: Array<string>
  height: number
  weight: number
  stats: Array<PokeStat>
  //description: //https://pokeapi.co/api/v2/pokemon-species/name
  //evolutionChain: https://pokeapi.co/api/v2/evolution-chain/name/
}

export interface PokemonDetailed extends Pokemon{
  description: string;
  //evolutionChain: https://pokeapi.co/api/v2/evolution-chain/name/
}
