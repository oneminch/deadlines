<script lang="ts" setup>
const { deadlines, deleteDeadlineItem, updateDeadlineItem } = useDeadlines()

const handleItemDelete = async (deadlineId: string) => {
  await deleteDeadlineItem(deadlineId)
}

const handleItemUpdate = async (deadline: DeadlineItem) => {
  await updateDeadlineItem(deadline)
}
</script>

<template>
  <div
    class="w-full rounded-md py-2 px-6 sm:py-4 sm:px-8 border border-mist-200 dark:border-mist-600 bg-white dark:bg-mist-800 flex flex-col"
  >
    <template v-if="deadlines.length > 0">
      <ul>
        <app-deadline-item
          v-for="deadline in deadlines"
          :key="deadline.id"
          :deadline="deadline"
          @delete="handleItemDelete"
          @update="handleItemUpdate"
        />
      </ul>
    </template>

    <template v-else>
      <div class="min-h-64 flex items-center justify-center">
        <h2 class="text-3xl font-semibold text-mist-400 dark:text-mist-600">
          No upcoming deadlines 🌴
        </h2>
      </div>
    </template>
  </div>
</template>
