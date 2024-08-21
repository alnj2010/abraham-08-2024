import type { Pokemon } from '@/typings/Pokemon'
import { ref, type Ref } from 'vue'

export function useTeam(): {
  myTeam: Ref<Map<string, Pokemon>>
  addPokemon: (pokemon: Pokemon) => void
} {
  const myTeam = ref<Map<string, Pokemon>>(new Map())

  function addPokemon(pokemon: Pokemon) {
    if (myTeam.value.has(pokemon.name)) {
      myTeam.value.delete(pokemon.name)
    } else if (myTeam.value.size < 6) {
      myTeam.value.set(pokemon.name, pokemon)
    }
  }
  return { myTeam, addPokemon }
}
