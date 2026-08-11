import type { InjectionKey } from 'vue'

const OFFLINE_DB_KEY: InjectionKey<any> = Symbol('offline-db')

const DEADLINES_STORE_KEY = 'lf_deadlines'
const OPTIONS_STORE_KEY = 'lf_options'

const DEADLINES = [
  'Create new deadlines.',
  'Update the date of a deadline.',
  'Change app preferences using the gear icon at the top.',
  'Export data to / import data from a JSON file.',
  'Purge your local data.',
]

const DEFAULT_OPTIONS: Options = {
  isFirstTime: true,
  toastsEnabled: true,
}

const ONBOARDING_DEADLINES = DEADLINES.map((deadline, index) => {
  const d: DeadlineItem = {
    id: `onboarding-${index}`,
    task: deadline,
    date: DateUtils.getTomorrow(),
  }

  return d
})

export {
  OFFLINE_DB_KEY,
  DEFAULT_OPTIONS,
  ONBOARDING_DEADLINES,
  DEADLINES_STORE_KEY,
  OPTIONS_STORE_KEY,
}
