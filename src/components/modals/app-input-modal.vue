<script setup lang="ts">
import IconPlusBold from '~icons/ph/plus-bold'

const props = defineProps<{
  triggerClass?: string
}>()

const inputModalProps = {
  title: 'Create New Deadlines',
  description: 'Use the input field and date picker to create a new deadline.',
}
</script>

<template>
  <app-modal v-bind="inputModalProps">
    <template #trigger>
      <Button
        aria-label="Toggle Input"
        title="Toggle Input"
        :class="cn('icon-button!', props.triggerClass)"
      >
        <IconPlusBold />
      </Button>
    </template>

    <section
      class="w-full sm:w-sm h-auto min-h-36 sm:py-6 p-2 flex flex-col gap-y-4 justify-between"
    >
      <app-input />
    </section>
  </app-modal>
</template>
