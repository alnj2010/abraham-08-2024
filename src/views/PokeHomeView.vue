<script setup lang="ts">
import { usePokePaginator } from '@/composables/usePokePaginator'
import { computed } from 'vue'
import PokeCard from '@/components/PokeCard.vue'
import { useTeam } from '@/composables/useTeam'

const { pokemons, goNextUrl, goPreviousUrl } = usePokePaginator()
const isLoading = computed(() => pokemons.value === null)

const { myTeam, addPokemon } = useTeam()
</script>

<template>
  <button class="m-2 w-4 bg-neutral-600 text-white" :disabled="isLoading" @click="goPreviousUrl">
    -
  </button>
  <button class="m-2 w-4 bg-neutral-600 text-white" :disabled="isLoading" @click="goNextUrl">
    +
  </button>

  <div class="flex items-center flex-wrap w-full">
    <PokeCard
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      @click="addPokemon(pokemon)"
      :style="{ backgroundColor: myTeam.has(pokemon.name) ? '#cbd5e1' : undefined }"
      :name="pokemon.name"
      :image="pokemon.image"
    />
  </div>
  <pre>{{ myTeam }}</pre>
</template>
