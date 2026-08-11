import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { hydrateAppStores } from '@/bootstrap'

const mocks = vi.hoisted(() => ({
  read: vi.fn<(_key: string, fallback: unknown) => Promise<unknown>>(),
  write: vi.fn<any>(),
}))

vi.mock('@/utils/persistence', () => ({
  persistence: {
    read: mocks.read,
    write: mocks.write,
    remove: vi.fn<any>(),
  },
}))

describe('hydrateAppStores', () => {
  beforeEach(() => {
    mocks.read.mockReset()
    mocks.write.mockReset()
  })

  it('hydrates stores eagerly at startup', async () => {
    mocks.read.mockImplementation(async (_key: string, fallback: unknown) => fallback)

    const pinia = createPinia()
    await hydrateAppStores(pinia)

    const optionsStore = useOptionsStore(pinia)
    const deadlinesStore = useDeadlinesStore(pinia)

    expect(optionsStore.hydrated).toBe(true)
    expect(deadlinesStore.hydrated).toBe(true)
    expect(optionsStore.options.isFirstTime).toBe(false)
    expect(mocks.write).toHaveBeenCalledWith(
      OPTIONS_STORE_KEY,
      expect.objectContaining({ isFirstTime: false }),
    )
  })
})
