<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue'

interface Props {
  type: string
  baseStat: number
  variant: 'light' | 'dark'
}

withDefaults(defineProps<Props>(), {
  variant: 'light'
})
</script>

<template>
  <div class="flex justify-between items-center mb-1">
    <div class="flex justify-between w-16 font-bold text-xs" :class="[variant]">
      <div>{{ type }}:</div>
      <div>{{ baseStat }}</div>
    </div>
    <div class="w-2/3">
      <ProgressBar
        :percent="Math.round((baseStat * 100) / 180)"
        :background="variant == 'light' ? 'white' : '#d1d5db'"
        :color="variant == 'light' ? '#f7cdcd' : '#3b82f6'"
      />
    </div>
  </div>
</template>

<style scoped>
.light {
  color: '#ffffff';
}

.dark {
  color: '#000';
}
</style>
