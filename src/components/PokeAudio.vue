<script setup lang="ts">
import PlayIcon from '@/components/icons/PlayIcon.vue'

interface Props {
  url: string
}

const props = defineProps<Props>()
const audio = new Audio(props.url)
function play() {
  audio.play()
}
</script>

<template>
  <div>
    <button class="w-6 rounded-full bg-[#FB6C6C] focus:outline-none shadow-md" @click="play">
      <PlayIcon></PlayIcon>
    </button>
  </div>
</template>
