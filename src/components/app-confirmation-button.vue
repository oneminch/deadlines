<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { ButtonVariants } from './ui/button'

const props = withDefaults(
  defineProps<{
    initialLabel: string
    primaryConfirmationLabel: string
    secondaryConfirmationLabel: string
    confirmationClass?: string
  }>(),
  {
    confirmationClass: '',
  },
)

const emit = defineEmits<{
  (e: 'confirmed'): void
}>()

let timeoutId: ReturnType<typeof setTimeout>
const isConfirming = ref(false)

const buttonLabel = computed(() =>
  isConfirming.value ? props.primaryConfirmationLabel : props.initialLabel,
)
const hiddenLabel = computed(() =>
  isConfirming.value ? props.secondaryConfirmationLabel : props.initialLabel,
)

const handleClick = () => {
  if (isConfirming.value) {
    emit('confirmed')
    reset()
  } else {
    isConfirming.value = true
    clearTimeout(timeoutId)
    timeoutId = setTimeout(reset, 5000)
  }
}

function reset() {
  isConfirming.value = false
  clearTimeout(timeoutId)
}
</script>

<template>
  <Button
    :class="[
      'relative hover:bg-destructive/90 dark:hover:bg-destructive/90',
      { [props.confirmationClass]: isConfirming, ['animate-pulse']: isConfirming },
    ]"
    :variant="($attrs.variant as ButtonVariants['variant']) || 'destructive'"
    :aria-label="hiddenLabel"
    :title="hiddenLabel"
    @click="handleClick"
  >
    <template v-if="$slots.default && !isConfirming">
      <slot>
        <span class="inline-flex items-center justify-center absolute inset-0">{{
          buttonLabel
        }}</span>
      </slot>
    </template>
    <template v-else>
      <span class="inline-flex items-center justify-center absolute inset-0">{{
        buttonLabel
      }}</span>
    </template>
  </Button>
</template>
