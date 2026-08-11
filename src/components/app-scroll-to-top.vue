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
  <div
    :class="[
      'flex items-center gap-x-2 shadow-md rounded-full p-1.5 sm:p-1 bg-brand-light dark:bg-mist-900 border-2 sm:border border-brand',
      $attrs.class,
      { hidden: !enableButton },
    ]"
    v-show="enableButton"
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="outline"
            @click="scrollToTop"
            class="action-item overflow-hidden shadow-md rounded-full! size-10! gap-x-0!"
            aria-label="Scroll to Top"
          >
            <IconCaretLineUp class="text-lg" />
          </Button>
        </TooltipTrigger>
        <TooltipContent position-strategy="absolute">
          <p>Scroll to Top</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
