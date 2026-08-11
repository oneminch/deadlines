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

describe('useDeadlinesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mocks.read.mockReset()
    mocks.write.mockReset()
  })

  it('hydrates existing stored deadlines and normalizes dates', async () => {
    mocks.read.mockResolvedValueOnce([
      {
        id: '1',
        task: 'Stored deadline',
        date: '2026-08-10T00:00:00.000Z',
      },
    ])

    const store = useDeadlinesStore()
    await store.hydrate()

    expect(store.deadlines).toHaveLength(1)
    expect(store.deadlines[0]?.date).toBeInstanceOf(Date)
    expect(store.sortedDeadlines[0]?.id).toBe('1')
  })

  it('keeps deadlines sorted and persists edits', async () => {
    mocks.read.mockResolvedValueOnce([])

    const store = useDeadlinesStore()
    await store.hydrate()

    await store.addDeadline({
      id: 'later',
      task: 'Later',
      date: new Date('2026-08-11T00:00:00.000Z'),
    })
    await store.addDeadline({
      id: 'earlier',
      task: 'Earlier',
      date: new Date('2026-08-10T00:00:00.000Z'),
    })

    expect(store.sortedDeadlines.map((deadline) => deadline.id)).toEqual(['earlier', 'later'])
    expect(mocks.write).toHaveBeenLastCalledWith(
      DEADLINES_STORE_KEY,
      expect.arrayContaining([
        expect.objectContaining({ id: 'later' }),
        expect.objectContaining({ id: 'earlier' }),
      ]),
    )

    await store.updateDeadline({
      id: 'later',
      task: 'Later updated',
      date: new Date('2026-08-12T00:00:00.000Z'),
    })
    await store.deleteDeadline('earlier')
    await store.purgeDeadlines()

    expect(store.sortedDeadlines).toEqual([])
    expect(mocks.write).toHaveBeenLastCalledWith(DEADLINES_STORE_KEY, [])
  })
})
