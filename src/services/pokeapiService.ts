import type { PokeStatType, Pokemon } from '@/typings/Pokemon'
import axios from 'axios'
const POKE_API = 'https://pokeapi.co/api/v2/pokemon/'
export const MAX_LIMIT_PER_PAGE = 25
export const TOTAL_POKEMONS = 151

type PokemonDTO = {
  name: string
  sprites: {
    front_default: string
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

type PaginatorPageItem = {
  name: string
}
type PaginatorPageResult = {
  results: Array<PaginatorPageItem>
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const { data: pokemonDto } = await axios.get<PokemonDTO>(`${POKE_API}${name}`)
  const pokemon: Pokemon = {
    name: pokemonDto.name,
    image: pokemonDto.sprites.front_default,
    cries: pokemonDto.cries.latest,
    types: pokemonDto.types.map((item) => item.type.name),
    height: pokemonDto.height,
    weight: pokemonDto.weight,
    stats: pokemonDto.stats.map((item) => ({ baseStat: item.base_stat, type: item.stat.name }))
  }
  return pokemon
}

export async function paginatePokemonsByPage(page: number): Promise<Array<Pokemon>> {
  const url = getUrlByPage(page)
  const pokemons = await axios
    .get<PaginatorPageResult>(url)
    .then((res) => res.data)
    .then((paginatorPageResult: PaginatorPageResult) =>
      Promise.all<Array<Promise<Pokemon>>>(
        paginatorPageResult.results.map(async (item) => getPokemonByName(item.name))
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
  return `${POKE_API}?${nextQueryString}`
}
