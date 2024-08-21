<script setup lang="ts">
import { useTeamStore } from '@/stores/team'
import PokeTeamCard from '@/components/PokeTeamCard.vue'

const { myTeam } = useTeamStore()
</script>

<template>
  <div>
    <div class="flex items-center flex-wrap w-full">
      <div v-for="[id, pokemon] in myTeam" :key="id">
        <PokeTeamCard
          :name="pokemon.name"
          :image="pokemon.image"
          :cries="pokemon.cries"
          :types="pokemon.types"
          :stats="pokemon.stats"
        />
        <RouterLink :to="`/team/${id}`">go to {{ id }}</RouterLink>
      </div>
    </div>
  </div>
</template>
