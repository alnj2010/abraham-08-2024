import { computed, ref } from 'vue'
import { useAxios } from './axios'
const POKE_API = 'https://pokeapi.co/api/v2/pokemon/'
const MAX_LIMIT_PER_PAGE = 2
const TOTAL_POKEMONS = 11

export function usePokePaginator() {
  const page = ref<number>(1)
  const url = computed<string>(() => getUrlByPage(page.value))
  const { data, error } = useAxios(url)

  const isThereNextPage = computed<boolean>(() => page.value * MAX_LIMIT_PER_PAGE <= TOTAL_POKEMONS)
  const isTherePreviousPage = computed<boolean>(() => page.value > 1)
  const pokemons = computed(() => (data.value ? data.value.results : null))
  

  function goNextUrl() {
    if (isThereNextPage.value) {
      page.value++
    }
  }
  function goPreviousUrl() {
    if (isTherePreviousPage.value) {
      page.value--
    }
  }
  return {
    pokemons,
    currentPage: page,
    error,
    isThereNextPage,
    isTherePreviousPage,
    goNextUrl,
    goPreviousUrl
  }
}

function getUrlByPage(page: number):string {
  const offset = MAX_LIMIT_PER_PAGE * (page - 1)
  const limit = Math.min(MAX_LIMIT_PER_PAGE, Math.max(0, TOTAL_POKEMONS - offset))

  const nextQueryString = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString()
  }).toString()
  return `${POKE_API}?${nextQueryString}`
}
