<script setup lang="ts">
import type { PokeStat, PokemonType } from '@/typings/Pokemon'
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import StatGraph from '@/components/StatGraph.vue'
import PokeAudio from '@/components/PokeAudio.vue'
import PokeTypeBadge from '@/components/PokeTypeBadge.vue'
import TrashButton from '@/components/TrashButton.vue'
import EyeButton from '@/components/EyeButton.vue'
import { useTeamStore } from '@/stores/team'

interface Props {
  color: string
  id: number
  name: string
  image: string
  cries: string
  types: Array<PokemonType>
  stats: Array<PokeStat>
}

const props = defineProps<Props>()
const { removePokemon } = useTeamStore()

const capitalizedName = computed(() => {
  return props.name.charAt(0).toUpperCase() + props.name.slice(1)
})
</script>

<template>
  <div class="pt-6">
    <div class="w-96 p-2 rounded-xl relative" :style="{ backgroundColor: color }">
      <div class="flex w-56 items-center">
        <div class="text-white font-bold text-2xl">{{ capitalizedName }}</div>
        <div class="w-10 flex justify-center items-center">
          <PokeAudio :url="cries" />
        </div>
      </div>

      <div class="flex justify-between w-32 mb-3">
        <PokeTypeBadge
          v-for="item in types"
          :key="item.type"
          :color="item.color"
          :text="item.type"
        />
      </div>
      <div class="w-32 h-32 absolute right-3 -top-6">
        <img :src="image" class="h-auto max-w-full" />
      </div>
      <div class="absolute bottom-7 right-6 flex justify-between w-24">
        <RouterLink :to="`/team/${id}`"> <EyeButton /> </RouterLink>
        <TrashButton @click="removePokemon(id)" />
      </div>
      <div class="w-56">
        <StatGraph
          v-for="stat in stats"
          :key="stat.type"
          :type="stat.type"
          :base-stat="stat.baseStat"
        />
      </div>
    </div>
  </div>
</template>
