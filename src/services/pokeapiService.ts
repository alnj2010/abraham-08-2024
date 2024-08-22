import type {
  EvolutionChain,
  PokeStatType,
  PokemonBasicInfo,
  PokemonFullInfo
} from '@/typings/Pokemon'
import axios from 'axios'

export const MAX_LIMIT_PER_PAGE = 25
export const TOTAL_POKEMONS = 151

const POKEAPI_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'
const POKEAPI_POKEMON_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species/'
type PokeColor =
  | 'black'
  | 'blue'
  | 'brown'
  | 'gray'
  | 'green'
  | 'pink'
  | 'purple'
  | 'red'
  | 'white'
  | 'yellow'
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
      name: string
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
  color: {
    name: PokeColor
  }
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
const COLOR_MAPPER: Record<PokeColor, string> = {
  black: '#424448',
  blue: '#76BDFE',
  brown: '#8C837E',
  gray: '#91B6C3',
  green: '#46D1B1',
  pink: '#CAD2DF',
  purple: '#8B4790',
  red: '#FB6C6C',
  white: '#CDD5E2',
  yellow: '#FFD970'
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

  const evolutionChainServiceResponse = await axios
    .get<EvolutionChainServiceResponse>(pokemonBasicInfo.evolutionChainUrl)
    .then((res) => res.data)

  return {
    ...pokemonBasicInfo,
    evolutionChain: evolutionChainServiceResponse.chain
  }
}

async function getPokemonBasicInfoByNameOrId(nameOrId: string | number): Promise<PokemonBasicInfo> {
  const { data: response } = await axios.get<PokemonServiceResponse>(
    `${POKEAPI_POKEMON}${nameOrId}`
  )

  const pokemonSpeciesServiceResponse = await axios
    .get<PokemonSpeciesServiceResponse>(`${POKEAPI_POKEMON_SPECIES}${nameOrId}`)
    .then((res) => res.data)

  const pokemon: PokemonBasicInfo = {
    id: response.id,
    name: response.name,
    image: response.sprites.front_default,
    cries: response.cries.latest,
    types: response.types.map((item) => item.type.name),
    height: response.height,
    weight: response.weight,
    stats: response.stats.map((item) => ({ baseStat: item.base_stat, type: item.stat.name })),
    description: pokemonSpeciesServiceResponse.flavor_text_entries[0].flavor_text,
    evolutionChainUrl: pokemonSpeciesServiceResponse.evolution_chain.url,
    color: COLOR_MAPPER[pokemonSpeciesServiceResponse.color.name]
  }
  return pokemon
}
