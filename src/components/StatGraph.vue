<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue'

interface Props {
  type: string
  baseStat: number
}

defineProps<Props>()
</script>

<template>
  <div class="flex justify-between items-center mb-1">
    <div class="flex justify-between w-16 font-bold text-white text-xs">
      <div>{{ type }}:</div>
      <div>{{ baseStat }}</div>
    </div>
    <div class="w-2/3">
      <ProgressBar
        :percent="Math.round((baseStat * 100) / 180)"
        background="white"
        color="#f7cdcd"
      />
    </div>
  </div>
</template>
