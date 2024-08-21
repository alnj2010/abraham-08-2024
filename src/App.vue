<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink class="m-3" to="/">Home</RouterLink>

      <RouterLink class="m-3" to="/team">Team</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
