<script setup lang="ts">
import { usePokePaginator } from '@/composables/pokeapi'
import { computed } from 'vue'
const { pokemons, currentPage, goNextUrl, goPreviousUrl, isThereNextPage, isTherePreviousPage } =
  usePokePaginator()
const isLoading = computed(() => pokemons.value === null)
</script>

<template>
  <button :disabled="isLoading" @click="goPreviousUrl">-</button>
  <button :disabled="isLoading" @click="goNextUrl">+</button>
  <div>{{ currentPage }}</div>
  <div>isThereNextPage {{ isThereNextPage }}</div>
  <div>isTherePreviousPage {{ isTherePreviousPage }}</div>
  <pre>{{ pokemons }}</pre>
</template>
