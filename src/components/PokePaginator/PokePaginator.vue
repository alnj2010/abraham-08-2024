<script setup lang="ts">
import { usePokePaginator } from '@/composables/usePokePaginator'
import { computed } from 'vue'
import PokePageCard from '@/components/PokePageCard.vue'
import ControlNext from '@/components/PokePaginator/ControlNext.vue'
import { useTeamStore } from '@/stores/team'

const { pokemons, goNextUrl, goPreviousUrl, isThereNextPage, isTherePreviousPage } =
  usePokePaginator()
const isLoading = computed(() => pokemons.value === null)
const { addPokemon, myTeam } = useTeamStore()
</script>

<template>
  <div class="max-w-[985px]">
    <div class="mx-5 flex justify-between md:justify-center">
      <div class="block md:hidden">
        <ControlNext v-if="!isLoading" @click="goPreviousUrl" :disabled="!isTherePreviousPage" />
      </div>
      <div class="">
        You have got <strong>{{ myTeam.size }}</strong> of <strong>6</strong> pokemons
      </div>
      <div class="block md:hidden">
        <ControlNext
          v-if="!isLoading"
          @click="goNextUrl"
          class="rotate-180"
          :disabled="!isThereNextPage"
        />
      </div>
    </div>

    <div class="flex h-[685px] justify-center items-center w-full" v-if="!isLoading">
      <div class="hidden md:block">
        <ControlNext @click="goPreviousUrl" :disabled="!isTherePreviousPage" />
      </div>

      <div
        class="min-w-96 w-max-[985px] py-6 md:px-6 bg-white md:border md:border-gray-200 md:rounded-lg md:shadow overflow-y-scroll scrollbar h-full"
      >
        <div class="flex items-center justify-center flex-wrap">
          <div class="m-1" v-for="pokemon in pokemons" :key="pokemon.name">
            <PokePageCard
              @click="addPokemon(pokemon)"
              :is-selected="myTeam.has(pokemon.id)"
              :can-be-selected="myTeam.size < 6 || myTeam.has(pokemon.id)"
              :name="pokemon.name"
              :image="pokemon.image"
              :color="pokemon.color"
            />
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <ControlNext @click="goNextUrl" class="rotate-180" :disabled="!isThereNextPage" />
      </div>
    </div>
  </div>
</template>
