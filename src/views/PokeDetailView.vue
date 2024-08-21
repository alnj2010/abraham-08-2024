<script setup lang="ts">
import { getPokemonBasicInfoByNameOrId } from '@/services/pokeapiService'
import type { PokemonBasicInfo } from '@/typings/Pokemon'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PokeCard from '@/components/PokeCard.vue'

const route = useRoute()
const pokemon = ref<PokemonBasicInfo | null>(null)

watchEffect(() => {
  pokemon.value = null
  getPokemonBasicInfoByNameOrId(route.params.id as string).then((data) => (pokemon.value = data))
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
  />
</template>
