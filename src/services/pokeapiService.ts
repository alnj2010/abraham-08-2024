import type {
  EvolutionChain,
  PokeStatType,
  PokeTypes,
  PokemonBasicInfo,
  PokemonFullInfo
} from '@/typings/Pokemon'
import axios from 'axios'

export const MAX_LIMIT_PER_PAGE = 25
export const TOTAL_POKEMONS = 151

const POKEAPI_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'
const POKEAPI_POKEMON_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species/'

type PokemonServiceResponse = {
  id: number
  name: string
  sprites: {
    front_default: string
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
  cries: { latest: string }
  types: Array<{
    slot: number
    type: {
      name: PokeTypes
    }
  }>
  height: number
  weight: number
  stats: Array<{
    base_stat: number
    stat: {
      name: PokeStatType
      url: string
    }
  }>
}

type PaginatorPage = {
  name: string
}
type PaginatorServiceResponse = {
  results: Array<PaginatorPage>
}

type PokemonSpeciesServiceResponse = {
  evolution_chain: {
    url: string
  }
  flavor_text_entries: Array<{
    flavor_text: string
    language: {
      name: string
      url: string
    }
    version: {
      name: string
      url: string
    }
  }>
}

type EvolutionChainServiceResponse = {
  chain: EvolutionChain
}
const COLOR_MAPPER: Record<PokeTypes, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  stellar: '#777',
  unknown: '#777'
}
const STATS_MAPPER: Record<PokeStatType, string> = {
  speed: 'sp',
  'special-defense': 'sp. def',
  'special-attack': 'sp-atk',
  defense: 'def',
  attack: 'atk',
  hp: 'hp'
}

export async function paginatePokemonsByPage(page: number): Promise<Array<PokemonBasicInfo>> {
  const url = getUrlByPage(page)

  const pokemons = await axios
    .get<PaginatorServiceResponse>(url)
    .then((res) => res.data)
    .then((response: PaginatorServiceResponse) =>
      Promise.all<Array<Promise<PokemonBasicInfo>>>(
        response.results.map(async (item) => getPokemonBasicInfoByNameOrId(item.name))
      )
    )

  return pokemons
}

function getUrlByPage(page: number): string {
  const offset = MAX_LIMIT_PER_PAGE * (page - 1)
  const limit = Math.min(MAX_LIMIT_PER_PAGE, Math.max(0, TOTAL_POKEMONS - offset))

  const nextQueryString = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString()
  }).toString()
  return `${POKEAPI_POKEMON}?${nextQueryString}`
}

export async function getPokemonFullInfoById(id: number): Promise<PokemonFullInfo> {
  const pokemonBasicInfo = await getPokemonBasicInfoByNameOrId(id)

  const pokemonSpeciesServiceResponse = await axios
    .get<PokemonSpeciesServiceResponse>(`${POKEAPI_POKEMON_SPECIES}${id}`)
    .then((res) => res.data)

  const evolutionChainServiceResponse = await axios
    .get<EvolutionChainServiceResponse>(pokemonSpeciesServiceResponse.evolution_chain.url)
    .then((res) => res.data)

  return {
    ...pokemonBasicInfo,
    evolutionChain: evolutionChainServiceResponse.chain,
    description: pokemonSpeciesServiceResponse.flavor_text_entries[0].flavor_text
  }
}

export async function getPokemonBasicInfoByNameOrId(nameOrId: string | number): Promise<PokemonBasicInfo> {
  const { data: response } = await axios.get<PokemonServiceResponse>(
    `${POKEAPI_POKEMON}${nameOrId}`
  )
  const type = response.types.find((type) => type.slot === 1)

  const pokemon: PokemonBasicInfo = {
    id: response.id,
    name: response.name,
    image: {
      small: response.sprites.front_default,
      big: response.sprites.other.dream_world.front_default
    },
    cries: response.cries.latest,
    types: response.types.map((item) => ({
      type: item.type.name,
      color: COLOR_MAPPER[item.type.name]
    })),
    height: response.height,
    weight: response.weight,
    stats: response.stats.map((item) => ({
      baseStat: item.base_stat,
      type: STATS_MAPPER[item.stat.name]
    })),
    color: type ? COLOR_MAPPER[type.type.name] : '#777'
  }
  return pokemon
}
