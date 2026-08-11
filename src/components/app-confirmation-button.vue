<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    initialLabel: string
    primaryConfirmationLabel: string
    secondaryConfirmationLabel: string
    confirmationClass?: string
  }>(),
  {
    confirmationClass: 'false',
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
  <button
    :class="{ confirming: isConfirming, [confirmationClass]: isConfirming }"
    :aria-label="hiddenLabel"
    :title="hiddenLabel"
    @click="handleClick"
  >
    <template v-if="$slots.default && !isConfirming">
      <slot>
        {{ buttonLabel }}
      </slot>
    </template>
    <template v-else>
      {{ buttonLabel }}
    </template>
  </button>
</template>

<style scoped>
@keyframes pulse {
  50% {
    opacity: 0.6;
  }
}
.confirming {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
