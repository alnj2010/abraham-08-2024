<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <main class="flex flex-col h-full">
    <header>
      <NavBar />
    </header>
    <div class="flex-grow">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
