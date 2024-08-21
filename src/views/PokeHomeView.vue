<script setup lang="ts">
import { usePokePaginator } from '@/composables/usePokePaginator'
import type { Pokemon } from '@/typings/Pokemon'
import { computed, ref } from 'vue'

const { pokemons, goNextUrl, goPreviousUrl } = usePokePaginator()
const isLoading = computed(() => pokemons.value === null)

const myTeam = ref<Array<Pokemon>>([])

function addPokemon(pokemon: Pokemon) {
  myTeam.value.push(pokemon)
}
</script>

<template>
  <button class="m-2 w-4 bg-neutral-600 text-white" :disabled="isLoading" @click="goPreviousUrl">
    -
  </button>
  <button class="m-2 w-4 bg-neutral-600 text-white" :disabled="isLoading" @click="goNextUrl">
    +
  </button>

  <div class="flex items-center flex-wrap w-full">
    <div
      v-for="pokemon in pokemons"
      :key="pokemon.name"
      @click="addPokemon(pokemon)"
      class="border-black border m-3 cursor-pointer hover:bg-slate-300"
    >
      <img :src="pokemon.image" alt="" />
      <h5>{{ pokemon.name }}</h5>
    </div>
  </div>
  <pre>{{myTeam}}</pre>
</template>
