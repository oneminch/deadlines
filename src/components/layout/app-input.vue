<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const toast = useToast()
const { addDeadlineItem } = useDeadlines()
const currentDate = ref<DatePickerModelValue>(DateUtils.getToday())
const newEntry = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const createNewDeadline = async () => {
  if (!newEntry.value.trim()) {
    toast.error('Please Enter a Deadline.', true)
    return
  } else if (!currentDate.value) {
    toast.error('Please Pick a Valid Date.', true)
    return
  }

  const deadlineItem: DeadlineItem = {
    id: Date.now().toString(),
    task: newEntry.value,
    date: currentDate.value as Date,
  }

  newEntry.value = ''
  currentDate.value = DateUtils.getToday()

  await addDeadlineItem(deadlineItem)
}

onMounted(() => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
})
</script>

<template>
  <form
    class="w-full bg-transparent flex flex-col items-center gap-y-4"
    @submit.prevent="createNewDeadline"
  >
    <input
      type="text"
      v-model="newEntry"
      ref="inputRef"
      placeholder="Enter a Deadline"
      aria-label="Enter a Deadline"
      @keypress.enter.prevent="createNewDeadline"
      class="w-full h-10 text-base flex items-center justify-center rounded py-1 px-3 text-mist-900 dark:text-mist-50 bg-mist-50 dark:bg-mist-900 border border-mist-200 dark:border-mist-600 focus-visible:global-focus"
    />

    <app-date-picker
      :date="currentDate"
      :is-inline="true"
      @update:date="(date: DatePickerModelValue) => (currentDate = date)"
    />

    <button type="submit" class="action-item w-full! h-10! bg-brand! text-mist-50! border-none!">
      Create
    </button>
  </form>
</template>
