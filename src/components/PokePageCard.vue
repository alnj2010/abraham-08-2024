<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  isSelected: boolean
  image: string
  name: string
  color: string
  canBeSelected: boolean
}

const props = defineProps<Props>()

const capitalizedName = computed(() => {
  return props.name.charAt(0).toUpperCase() + props.name.slice(1)
})
</script>

<template>
  <div
    class="w-44 h-28 pl-4 pt-4 rounded-xl relative"
    :class="{ selected: isSelected, 'can-be-selected': canBeSelected }"
    :style="{ backgroundColor: color }"
  >
    <div class="pokename font-bold text-white">{{ capitalizedName }}</div>
    <div class="absolute w-full bottom-0 right-0">
      <div class="image flex justify-end relative">
        <div class="w-24">
          <img :src="image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected {
  border-width: 4px;
  border-color: #2e3843;
}
.can-be-selected {
  cursor: pointer;
}
.can-be-selected:hover {
  border-width: 4px;
  border-color: #2e3843;
}
</style>
