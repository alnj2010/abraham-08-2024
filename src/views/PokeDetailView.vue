<script setup lang="ts">
import { getPokemonFullInfoById } from '@/services/pokeapiService'
import type { PokemonFullInfo } from '@/typings/Pokemon'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import PokeTypeBadge from '@/components/PokeTypeBadge.vue'
import PokeAudio from '@/components/PokeAudio.vue'
import TabsBox from '@/components/TabsBox/TabsBox.vue'
import AboutTab from '@/components/TabsBox/AboutTab.vue'
import EvolutionTab from '@/components/TabsBox/EvolutionTab.vue'
const route = useRoute()
const pokemon = ref<PokemonFullInfo | null>(null)

const capitalizedName = computed(() => {
  return pokemon.value
    ? pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1)
    : null
})

watchEffect(() => {
  pokemon.value = null
  getPokemonFullInfoById(parseInt(route.params.id as string)).then((data) => (pokemon.value = data))
})
</script>

<template>
  <div class="w-full h-[93.7vh]" :style="{ backgroundColor: pokemon?.color }">
    <div class="h-full flex flex-col">
      <div class="p-5 h-96">
        <div class="flex items-center">
          <div class="text-4xl text-white font-bold mr-3">
            {{ capitalizedName }}
          </div>
          <div>
            <PokeAudio v-if="pokemon" :url="pokemon.cries" />
          </div>
        </div>

        <div class="flex mt-3">
          <div v-for="type in pokemon?.types" :key="type.type">
            <PokeTypeBadge :color="type.color" :text="type.type" variant="big" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-t-3xl flex-grow relative">
        <div class="w-52 h-52 absolute -top-44 right-1/4 flex">
          <img :src="pokemon?.image.big" class="h-auto max-w-full" />
        </div>
        <div class="p-5 pt-10">
          <TabsBox :tabs="['About', 'Evolution']" v-slot="{ currentTab }">
            <div class="max-h-80 overflow-y-scroll scrollbar">
              <AboutTab
                v-if="currentTab == 'About' && pokemon"
                :description="pokemon.description"
                :height="pokemon.height"
                :weight="pokemon.weight"
                :stats="pokemon.stats"
              />

              <EvolutionTab
                v-else-if="currentTab === 'Evolution' && pokemon"
                :evolution-chain="pokemon.evolutionChain"
              />
            </div>
          </TabsBox>
        </div>
      </div>
    </div>
  </div>
</template>
