<script setup lang="ts">
import type { PokeStat } from '@/typings/Pokemon'

interface Props {
  name: string
  image: string
  cries: string
  types: Array<string>
  stats: Array<PokeStat>
}

defineProps<Props>()
</script>

<template>
  <div class="border-black border m-3 cursor-pointer hover:bg-slate-300 w-96">
    <img :src="image" alt="" />
    <h5>{{ name }}</h5>
    <h5>{{ cries }}</h5>
    <h5>{{ types }}</h5>
    <h5>{{ stats }}</h5>
  </div>
</template>
