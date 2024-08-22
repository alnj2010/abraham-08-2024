<script setup lang="ts">
import { useTeamStore } from '@/stores/team'
import PokeTeamCard from '@/components/PokeTeamCard.vue'

const { myTeam } = useTeamStore()
</script>

<template>
  <div class="bg-[#FB6C6C] w-full h-[93.7vh]">
    <div class="flex items-center justify-around flex-wrap w-full" v-if="myTeam.size > 0">
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
    <div v-else class="flex justify-center items-center h-full flex-col">
      <div class="text-2xl md:text-5xl font-bold text-white text-center">
        Oh! You have not caught any pokemon yet!
      </div>
      <div class="text-xl md:text-3xl text-white text-center mt-6">
        go
        <RouterLink to="/" class="underline">
          home
        </RouterLink>
        catch 6 cute pokemons
      </div>
    </div>
  </div>
</template>
