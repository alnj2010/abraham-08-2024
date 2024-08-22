<script setup lang="ts">
import type { EvolutionChain, PokemonBasicInfo } from '@/typings/Pokemon'
import EvolutionChainComponent from '@/components/EvolutionChainComponent.vue'
import { ref, watchEffect } from 'vue'
import { getPokemonBasicInfoByNameOrId } from '@/services/pokeapiService'

interface Props {
  evolutionChain: EvolutionChain
}
const props = defineProps<Props>()

const pokemon = ref<PokemonBasicInfo | null>(null)

getPokemonBasicInfoByNameOrId(props.evolutionChain.species.name).then(
  (data) => (pokemon.value = data)
)
</script>

<template>
  <div>
    <div class="py-0.5 flex items-center gap-x-0.5 w-full">
      <div class="grow px-1.5 rounded-md">
        <div class="flex items-center gap-x-3">
          <div class="">
            <img :src="pokemon?.image.small" class="h-auto max-w-full" />
          </div>
          <div class="grow">
            <span class="text-lg text-gray-800 font-bold">{{ evolutionChain.species.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div
        class="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-300"
      >
        <div
          v-for="evolutions in evolutionChain.evolves_to"
          :key="evolutions.species.name"
          class="px-2"
        >
          <EvolutionChainComponent :evolution-chain="evolutions" />
        </div>
      </div>
    </div>
  </div>
</template>
