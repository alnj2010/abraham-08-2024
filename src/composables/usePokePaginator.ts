import { computed, ref, watchEffect, type Ref } from 'vue'
import type { Pokemon } from '@/typings/Pokemon'
import {
  MAX_LIMIT_PER_PAGE,
  TOTAL_POKEMONS,
  paginatePokemonsByPage
} from '@/services/pokeapiService'

export function usePokePaginator(): {
  pokemons: Ref<Array<Pokemon> | null>
  currentPage: Ref<Number>
  error: Ref<any>
  isThereNextPage: Ref<boolean>
  isTherePreviousPage: Ref<boolean>
  goNextUrl: () => void
  goPreviousUrl: () => void
} {
  const page = ref<number>(1)
  const pokemons = ref<Array<any> | null>(null)
  const error = ref(null)

  watchEffect(() => {
    pokemons.value = null
    error.value = null

    paginatePokemonsByPage(page.value)
      .then((data: Array<Pokemon>) => (pokemons.value = data))
      .catch((err) => (error.value = err))
  })

  const isThereNextPage = computed<boolean>(() => page.value * MAX_LIMIT_PER_PAGE <= TOTAL_POKEMONS)
  const isTherePreviousPage = computed<boolean>(() => page.value > 1)

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
