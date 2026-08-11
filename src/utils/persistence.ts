import localforage from 'localforage'

export interface PersistenceDriver {
  getItem<T>(key: string): Promise<T | null>
  setItem<T>(key: string, value: T): Promise<T>
  removeItem(key: string): Promise<void>
}

export const createPersistenceService = (driver: PersistenceDriver) => {
  return {
    async read<T>(key: string, fallback: T): Promise<T> {
      const value = await driver.getItem<T>(key)

      if (value === null) {
        await driver.setItem(key, fallback)
        return fallback
      }

      return value
    },
    async write<T>(key: string, value: T): Promise<void> {
      await driver.setItem(key, value)
    },
    async remove(key: string): Promise<void> {
      await driver.removeItem(key)
    },
  }
}

const driver = localforage.createInstance({
  name: 'OfflineData',
  storeName: 'offline_db',
  description: 'Used to store all data: Deadlines and User Settings.',
})

export const persistence = createPersistenceService(driver)
