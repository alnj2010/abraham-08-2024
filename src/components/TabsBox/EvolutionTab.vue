<script setup lang="ts">
import type { EvolutionChain } from '@/typings/Pokemon'
import EvolutionChainComponent from '@/components/EvolutionChainComponent.vue'

interface Props {
  evolutionChain: EvolutionChain
}
defineProps<Props>()
</script>

<template>
  <div class="flex justify-center p-4"><EvolutionChainComponent :evolution-chain="evolutionChain" /></div>
</template>
