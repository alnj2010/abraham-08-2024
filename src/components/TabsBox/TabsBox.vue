<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  tabs: Array<string>
}
const props = defineProps<Props>()

const currentTab = ref(props.tabs[0])
</script>

<template>
  <div>
    <div class="text-lg font-medium text-center text-gray-500 border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px">
        <li class="me-2" v-for="tab in tabs" :key="tab">
          <button
            @click="currentTab = tab"
            class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
            :class="{ active: currentTab === tab }"
          >{{tab}}</button>
        </li>
      </ul>
    </div>
    <div>
      <slot :currentTab="currentTab"></slot>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: #111827;
  border-color: #111827;
}
</style>
