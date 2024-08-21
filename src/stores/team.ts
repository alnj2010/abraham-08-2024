import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { PokemonBasicInfo } from '@/typings/Pokemon'

export const useTeamStore = defineStore('team', () => {
  const myTeam = ref<Map<number, PokemonBasicInfo>>(new Map())

  function addPokemon(pokemon: PokemonBasicInfo) {
    if (myTeam.value.has(pokemon.id)) {
      myTeam.value.delete(pokemon.id)
    } else if (myTeam.value.size < 6) {
      myTeam.value.set(pokemon.id, pokemon)
    }
  }
  return { myTeam, addPokemon }
})
