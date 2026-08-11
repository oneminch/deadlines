import { toast } from 'vue-sonner'

export default function useToast() {
  const optionsStore = useOptionsStore()

  const customToast = {
    success: (detail: string, bypass: boolean = false) => {
      if (!optionsStore.options.toastsEnabled && !bypass) {
        console.log(detail)
        return
      }

      toast.success(detail)
    },
    error: (detail: string, bypass: boolean = false) => {
      if (!optionsStore.options.toastsEnabled && !bypass) {
        console.log(detail)
        return
      }

      toast.error(detail)
    },
  }

  return customToast
}
