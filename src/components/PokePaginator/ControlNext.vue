<script setup lang="ts">
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
</script>

<template>
  <button><ArrowIcon :color="$attrs.disabled ? '#DDDDDD' : '#2e3843'" /></button>
</template>
