import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const useDeadlinesStore = defineStore('deadlines', () => {
  const deadlines = ref<DeadlineItem[]>([])
  const hydrated = shallowRef(false)

  const sortedDeadlines = computed(() => {
    return [...deadlines.value].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
  })

  const normalizeDeadline = (deadline: DeadlineItem): DeadlineItem => ({
    ...deadline,
    date: new Date(deadline.date),
  })

  const normalizeDeadlines = (items: DeadlineItem[]) =>
    items.map((deadline) => normalizeDeadline(deadline))

  const persistDeadlines = async () => {
    await persistence.write(DEADLINES_STORE_KEY, normalizeDeadlines(deadlines.value))
  }

  const hydrate = async () => {
    if (hydrated.value) {
      return deadlines.value
    }

    const storedDeadlines = await persistence.read(DEADLINES_STORE_KEY, ONBOARDING_DEADLINES)

    deadlines.value = normalizeDeadlines(storedDeadlines)
    hydrated.value = true

    return deadlines.value
  }

  const addDeadline = async (deadline: DeadlineItem) => {
    const previousDeadlines = deadlines.value
    deadlines.value = [...deadlines.value, normalizeDeadline(deadline)]

    try {
      await persistDeadlines()
    } catch (error) {
      deadlines.value = previousDeadlines
      throw error
    }
  }

  const updateDeadline = async (updatedDeadline: DeadlineItem) => {
    const index = deadlines.value.findIndex((deadline) => deadline.id === updatedDeadline.id)

    if (index === -1) {
      return
    }

    const nextDeadlines = [...deadlines.value]
    nextDeadlines[index] = normalizeDeadline(updatedDeadline)
    const previousDeadlines = deadlines.value
    deadlines.value = nextDeadlines

    try {
      await persistDeadlines()
    } catch (error) {
      deadlines.value = previousDeadlines
      throw error
    }
  }

  const deleteDeadline = async (deadlineId: string) => {
    const previousDeadlines = deadlines.value
    deadlines.value = deadlines.value.filter((deadline) => deadline.id !== deadlineId)

    try {
      await persistDeadlines()
    } catch (error) {
      deadlines.value = previousDeadlines
      throw error
    }
  }

  const importDeadlines = async (deadlineItems: DeadlineItem[]) => {
    const previousDeadlines = deadlines.value
    deadlines.value = [...deadlines.value, ...normalizeDeadlines(deadlineItems)]

    try {
      await persistDeadlines()
    } catch (error) {
      deadlines.value = previousDeadlines
      throw error
    }
  }

  const purgeDeadlines = async () => {
    const previousDeadlines = deadlines.value
    deadlines.value = []

    try {
      await persistDeadlines()
    } catch (error) {
      deadlines.value = previousDeadlines
      throw error
    }
  }

  return {
    deadlines,
    hydrated,
    sortedDeadlines,
    hydrate,
    addDeadline,
    updateDeadline,
    deleteDeadline,
    importDeadlines,
    purgeDeadlines,
  }
})
