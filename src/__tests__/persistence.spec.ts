import { describe, expect, it, vi } from 'vitest'

describe('createPersistenceService', () => {
  it('initializes missing values with the fallback', async () => {
    const driver = {
      getItem: vi.fn<() => any>().mockResolvedValue(null),
      setItem: vi.fn<() => any>().mockResolvedValue(undefined),
      removeItem: vi.fn<() => any>().mockResolvedValue(undefined),
    }

    const service = createPersistenceService(driver)
    const fallback = { value: 'fallback' }

    await expect(service.read('key', fallback)).resolves.toEqual(fallback)
    expect(driver.getItem).toHaveBeenCalledWith('key')
    expect(driver.setItem).toHaveBeenCalledWith('key', fallback)
  })

  it('reads, writes, and removes values', async () => {
    const driver = {
      getItem: vi.fn<() => any>().mockResolvedValue({ value: 'stored' }),
      setItem: vi.fn<() => any>().mockResolvedValue(undefined),
      removeItem: vi.fn<() => any>().mockResolvedValue(undefined),
    }

    const service = createPersistenceService(driver)

    await expect(service.read('key', { value: 'fallback' })).resolves.toEqual({
      value: 'stored',
    })

    await service.write('key', { value: 'next' })
    await service.remove('key')

    expect(driver.setItem).toHaveBeenCalledWith('key', { value: 'next' })
    expect(driver.removeItem).toHaveBeenCalledWith('key')
  })
})
