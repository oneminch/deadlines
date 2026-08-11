import { storeToRefs } from 'pinia'

export default function useOptions() {
  const toast = useToast()
  const optionsStore = useOptionsStore()
  const { options } = storeToRefs(optionsStore)

  const updateOptions = async (newOptions: Partial<Options>, notify: boolean = true) => {
    try {
      await optionsStore.updateOptions(newOptions)

      if (notify) {
        toast.success('Options Updated Successfully.')
      }
    } catch (e) {
      console.error('Error Updating Options Database:', e)

      if (notify) {
        toast.error('Error Updating Options.')
      }
    }
  }

  return {
    options,
    updateOptions,
  }
}
