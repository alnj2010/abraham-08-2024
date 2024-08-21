import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Pokemon } from '@/typings/Pokemon'

export const useTeamStore = defineStore('team', () => {
  const myTeam = ref<Map<string, Pokemon>>(new Map())

  function addPokemon(pokemon: Pokemon) {
    if (myTeam.value.has(pokemon.name)) {
      myTeam.value.delete(pokemon.name)
    } else if (myTeam.value.size < 6) {
      myTeam.value.set(pokemon.name, pokemon)
    }
  }
  return { myTeam, addPokemon }
})
