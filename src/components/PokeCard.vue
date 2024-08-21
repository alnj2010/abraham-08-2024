<script setup lang="ts">
interface Props {
  image: string
  name: name
}

defineProps<Props>()
</script>

<template>
  <div class="border-black border m-3 cursor-pointer hover:bg-slate-300">
    <img :src="image" alt="" />
    <h5>{{ name }}</h5>
  </div>
</template>
