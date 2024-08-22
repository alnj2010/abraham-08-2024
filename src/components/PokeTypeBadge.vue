<script setup lang="ts">
interface Props {
  color: string
  text: string
}

defineProps<Props>()
</script>

<template>
  <div>
    <span
      class="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded shadow-md"
      :style="{ backgroundColor: color }"
      >{{ text }}</span
    >
  </div>
</template>
