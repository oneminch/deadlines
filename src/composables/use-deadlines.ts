import { storeToRefs } from 'pinia'

export default function useDeadlines() {
  const toast = useToast()
  const deadlinesStore = useDeadlinesStore()
  const { sortedDeadlines } = storeToRefs(deadlinesStore)

  const addDeadlineItem = async (deadline: DeadlineItem) => {
    try {
      await deadlinesStore.addDeadline(deadline)
      toast.success('Deadline Added Successfully.')
    } catch (e) {
      console.error('Error Adding Item', e)
      toast.error('Error Adding Item.')
    }
  }

  const updateDeadlineItem = async (updatedDeadline: DeadlineItem) => {
    try {
      await deadlinesStore.updateDeadline(updatedDeadline)
      toast.success('Deadline Updated Successfully.')
    } catch (e) {
      console.error('Error Updating Item', e)
      toast.error('Error Updating Item.')
    }
  }

  const deleteDeadlineItem = async (deadlineId: string) => {
    try {
      await deadlinesStore.deleteDeadline(deadlineId)
      toast.success('Deadline Deleted Successfully.')
    } catch (e) {
      console.error('Error Deleting Item', e)
      toast.error('Error Deleting Item.')
    }
  }

  const populateDeadlineItems = async (deadlineItems: DeadlineItem[]) => {
    try {
      await deadlinesStore.importDeadlines(deadlineItems)
    } catch (e) {
      console.error('Error Adding Items', e)
      toast.error('Error Adding Items.')
    }
  }

  const purgeDeadlines = async () => {
    try {
      await deadlinesStore.purgeDeadlines()
      toast.success('Database Purged Successfully.')
    } catch (e) {
      console.error('Error Purging Deadlines', e)
      toast.error('Error Purging Database.')
    }
  }

  return {
    deadlines: sortedDeadlines,
    addDeadlineItem,
    updateDeadlineItem,
    deleteDeadlineItem,
    populateDeadlineItems,
    purgeDeadlines,
  }
}
