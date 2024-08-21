<script setup lang="ts">
import { getPokemonFullInfoById } from '@/services/pokeapiService'
import type { PokemonFullInfo } from '@/typings/Pokemon'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PokeCard from '@/components/PokeCard.vue'

const route = useRoute()
const pokemon = ref<PokemonFullInfo | null>(null)

watchEffect(() => {
  pokemon.value = null
  getPokemonFullInfoById(parseInt(route.params.id as string)).then((data) => (pokemon.value = data))
})
</script>

<template>
  <PokeCard
    v-if="pokemon"
    :name="pokemon.name"
    :image="pokemon.image"
    :cries="pokemon.cries"
    :types="pokemon.types"
    :stats="pokemon.stats"
    :description="pokemon.description"
    :evolution-chain="pokemon.evolutionChain"
  />
</template>
