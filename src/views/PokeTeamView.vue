<script setup lang="ts">
import { useTeamStore } from '@/stores/team'
import PokeTeamCard from '@/components/PokeTeamCard.vue'

const { myTeam } = useTeamStore()
</script>

<template>
  <div>
    <div class="flex items-center justify-around flex-wrap w-full">
      <div v-for="[id, pokemon] in myTeam" :key="id" class="m-1">
        <PokeTeamCard
          :id="id"
          :color="pokemon.color"
          :name="pokemon.name"
          :image="pokemon.image.big"
          :cries="pokemon.cries"
          :types="pokemon.types"
          :stats="pokemon.stats"
        />
      </div>
    </div>
  </div>
</template>
