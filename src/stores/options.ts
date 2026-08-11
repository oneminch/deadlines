import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const useOptionsStore = defineStore('options', () => {
  const options = ref<Options>({ ...DEFAULT_OPTIONS })
  const hydrated = shallowRef(false)

  const hydrate = async () => {
    if (hydrated.value) {
      return options.value
    }

    const storedOptions = await persistence.read(OPTIONS_STORE_KEY, DEFAULT_OPTIONS)

    options.value = {
      ...DEFAULT_OPTIONS,
      ...storedOptions,
    }
    hydrated.value = true

    return options.value
  }

  const updateOptions = async (newOptions: Partial<Options>) => {
    const previousOptions = { ...options.value }
    options.value = {
      ...options.value,
      ...newOptions,
    }

    try {
      await persistence.write(OPTIONS_STORE_KEY, { ...options.value })
    } catch (error) {
      options.value = previousOptions
      throw error
    }
  }

  return {
    options,
    hydrated,
    hydrate,
    updateOptions,
  }
})
