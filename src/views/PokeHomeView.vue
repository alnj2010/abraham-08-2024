<script setup lang="ts">
import { usePokePaginator } from '@/composables/usePokePaginator'
import { computed } from 'vue'
import PokePageCard from '@/components/PokePageCard.vue'
import { useTeamStore } from '@/stores/team'

const { pokemons, goNextUrl, goPreviousUrl } = usePokePaginator()
const isLoading = computed(() => pokemons.value === null)
const { addPokemon, myTeam } = useTeamStore()
</script>

<template>
  <button class="m-2 w-4 bg-neutral-600 text-white" :disabled="isLoading" @click="goPreviousUrl">
    -
  </button>
  <button class="m-2 w-4 bg-neutral-600 text-white" :disabled="isLoading" @click="goNextUrl">
    +
  </button>

  <div class="flex items-center flex-wrap w-full">
    <PokePageCard
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      @click="addPokemon(pokemon)"
      :style="{ backgroundColor: myTeam.has(pokemon.id) ? '#cbd5e1' : undefined }"
      :name="pokemon.name"
      :image="pokemon.image"
    />
  </div>
</template>
