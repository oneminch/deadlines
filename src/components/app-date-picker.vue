<script setup lang="ts">
import { parseDate } from '@internationalized/date'
import { type DateValue, toDate } from 'reka-ui/date'
import { computed, ref } from 'vue'
import IconCalendarBlank from '~icons/ph/calendar-blank-duotone'

const props = withDefaults(
  defineProps<{
    date: DatePickerModelValue
    isInline?: boolean
    class?: string
  }>(),
  {
    isInline: false,
  },
)

const emit = defineEmits<{
  (e: 'update:date', value: Date): void
}>()

const datePickerOpen = ref(false)

const localDateValue = computed({
  get: () => (props.date ? parseDate(props.date.toISOString().slice(0, 10)) : undefined),
  set: (newVal: DateValue) => {
    if (newVal) {
      emit('update:date', toDate(newVal))
    }
  },
})

const df = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
})
</script>

<template>
  <div v-if="isInline" class="w-full">
    <Calendar
      v-model="localDateValue"
      calendar-label="Pick a date"
      initial-focus
      class="flex flex-col items-center rounded border border-mist-200 dark:border-mist-700"
    />
  </div>
  <Popover :class="cn(props.class)" v-model:open="datePickerOpen" v-else>
    <PopoverTrigger as-child>
      <Button
        type="button"
        variant="outline"
        :class="
          cn(
            'font-normal min-w-40 h-10 *:shrink-0 rounded-sm text-mist-900 dark:text-mist-50 bg-white dark:bg-mist-800 hover:bg-mist-200 dark:hover:bg-mist-700 border border-mist-200 dark:border-mist-700 focus-visible:global-focus! pr-6 max-w-none overflow-hidden text-center focus-visible:outline-none gap-2',
            !localDateValue && 'text-muted-foreground',
          )
        "
      >
        <IconCalendarBlank class="size-5" />
        {{ localDateValue ? df.format(toDate(localDateValue)) : 'Pick a date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-model="localDateValue"
        calendar-label="Pick a date"
        @update:model-value="() => (datePickerOpen = false)"
        class="rounded-md border border-mist-200 dark:border-mist-700 shadow"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>
