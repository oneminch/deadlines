import type { Pinia } from 'pinia'

export async function hydrateAppStores(pinia: Pinia) {
  const optionsStore = useOptionsStore(pinia)
  const deadlinesStore = useDeadlinesStore(pinia)

  const results = await Promise.allSettled([optionsStore.hydrate(), deadlinesStore.hydrate()])

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      const storeName = index === 0 ? 'options' : 'deadlines'
      console.error(`Error hydrating ${storeName} store:`, result.reason)
    }
  })

  if (optionsStore.options.isFirstTime) {
    try {
      await optionsStore.updateOptions({ isFirstTime: false })
    } catch (error) {
      console.error('Error finalizing options hydration:', error)
    }
  }

  return {
    optionsStore,
    deadlinesStore,
  }
}
