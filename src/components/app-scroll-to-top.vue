<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import IconCaretLineUp from '~icons/ph/caret-line-up'

const enableButton = ref(false)

const handleScroll = () => {
  enableButton.value = window.scrollY > 100
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="scale">
    <div
      class="flex items-center gap-x-2 shadow-md rounded-full p-2 sm:p-1 bg-brand-light dark:bg-mist-900 border-2 sm:border border-brand"
      v-show="enableButton"
      :class="{ hidden: !enableButton }"
    >
      <button
        @click="scrollToTop"
        class="action-item overflow-hidden transition-all duration-300 ease-in-out shadow-md rounded-full! hover:px-6! w-10! sm:hover:w-auto! h-10! gap-x-0! sm:group"
        aria-label="Scroll to Top"
      >
        <span
          class="w-0 mr-0 overflow-hidden whitespace-nowrap transition-all duration-100 ease-in-out sm:group-hover:mr-2 sm:group-hover:w-32"
          >Scroll to Top</span
        >
        <IconCaretLineUp class="text-lg" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  @apply transition-all duration-100 ease-linear;
}

.scale-enter-from,
.scale-leave-to {
  @apply opacity-0 scale-75;
}
</style>
