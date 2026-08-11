import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  read: vi.fn<() => any>(),
  write: vi.fn<() => any>(),
}))

vi.mock('@/utils/persistence', () => ({
  persistence: {
    read: mocks.read,
    write: mocks.write,
    remove: vi.fn<() => any>(),
  },
}))

describe('useOptionsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mocks.read.mockReset()
    mocks.write.mockReset()
  })

  it('hydrates with defaults when storage is empty', async () => {
    mocks.read.mockResolvedValueOnce(DEFAULT_OPTIONS)

    const store = useOptionsStore()
    await store.hydrate()

    expect(store.options).toEqual(DEFAULT_OPTIONS)
  })

  it('persists option updates', async () => {
    mocks.read.mockResolvedValueOnce(DEFAULT_OPTIONS)

    const store = useOptionsStore()
    await store.hydrate()
    await store.updateOptions({ toastsEnabled: false })

    expect(store.options.toastsEnabled).toBe(false)
    expect(mocks.write).toHaveBeenCalledWith(OPTIONS_STORE_KEY, {
      isFirstTime: true,
      toastsEnabled: false,
    })
  })
})
