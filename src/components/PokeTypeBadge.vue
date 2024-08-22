<script setup lang="ts">
interface Props {
  color: string
  text: string
  variant: 'big' | 'small'
}

withDefaults(defineProps<Props>(), {
  variant: 'small'
})
</script>

<template>
  <div>
    <span
      class="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded shadow-md"
      :class="[variant]"
      :style="{ backgroundColor: color }"
      >{{ text }}</span
    >
  </div>
</template>

<style scoped>
.big {
  font-size: 1.2rem /* 12px */;
  line-height: 1rem /* 16px */;
}
.small {
  font-size: 0.75rem /* 12px */;
  line-height: 1rem /* 16px */;
}
</style>
