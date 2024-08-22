<script setup lang="ts">
interface Props {
  background: string
  color: string
  percent: number
}

defineProps<Props>()
</script>

<template>
  <div class="w-full rounded-full h-2.5 overflow-hidden" :style="{ backgroundColor: background }">
    <div class="h-2.5 rounded-full" :style="{ width: percent + '%', backgroundColor: color }"></div>
  </div>
</template>
