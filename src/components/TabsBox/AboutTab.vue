<script setup lang="ts">
import StatGraph from '@/components/StatGraph.vue'
import type { PokeStat } from '@/typings/Pokemon'
interface Props {
  description: string
  height: number
  weight: number
  stats: Array<PokeStat>
}
defineProps<Props>()
</script>

<template>
  <div class="mt-4">
    <div class="mb-2">
      <div class="mb-2">
        <div class="text-xl font-bold text-black mb-2">Description</div>
        <div>{{ description }}</div>
      </div>
      <div class="text-xl font-bold text-black mb-2">Weight & Height</div>
      <div class="section w-32 flex justify-between">
        <div class="text-sm font-bold text-gray-400">Weight</div>
        <div class="text-sm font-bold text-black">{{ weight }}</div>
      </div>
      <div class="section pt-2 w-32 flex justify-between">
        <div class="text-sm font-bold text-gray-400">Height</div>
        <div class="text-sm font-bold text-black">{{ height }}</div>
      </div>
    </div>
    <div class="mb-2">
      <div class="text-xl font-bold text-black mb-2">Stats</div>
      <div class="w-56">
        <StatGraph
          v-for="stat in stats"
          :key="stat.type"
          :type="stat.type"
          :base-stat="stat.baseStat"
          variant="dark"
        />
      </div>
    </div>
  </div>
</template>
