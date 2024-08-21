<script setup lang="ts">
import type { EvolutionChain, PokeStat } from '@/typings/Pokemon'

interface Props {
  name: string
  image: string
  cries: string
  types: Array<string>
  stats: Array<PokeStat>
  description: string
  evolutionChain: EvolutionChain
}

defineProps<Props>()
</script>

<template>
  <div class="border-black border m-3 cursor-pointer hover:bg-slate-300 w-96">
    <img :src="image" alt="" />
    <h5>{{ name }}</h5>
    <h5>{{ cries }}</h5>
    <h5>{{ types }}</h5>
    <pre>{{ stats }}</pre>
    <h5>{{ description }}</h5>
    <pre>{{ evolutionChain }}</pre>
  </div>
</template>
