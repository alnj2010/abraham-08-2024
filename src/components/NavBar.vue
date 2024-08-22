<script setup lang="ts">
import pokeball from '@/assets/pokeball.png'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()
const navs = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Team',
    path: '/team'
  }
]
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img :src="pokeball" class="h-8" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Pokedex</span
        >
      </RouterLink>
      <div class="w-auto">
        <ul
          class="font-medium flex p-0 mt-0 border-0 border-gray-100 rounded-lg flex-row md:space-x-8 rtl:space-x-reverse bg-white"
        >
          <li v-for="nav in navs" :key="nav.name">
            <RouterLink
              :to="nav.path"
              class="text-gray-900 rounded hover:bg-transparent md:border-0 p-0 mx-4"
              :class="{ current: currentRoute.path === nav.path }"
              >{{ nav.name }}</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.current {
  text-decoration-thickness: 4px;
  text-decoration-line: underline;
}
</style>
