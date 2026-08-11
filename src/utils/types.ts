interface DeadlineItem {
  id: string
  task: string
  date: Date
}

interface Options {
  isFirstTime?: boolean
  toastsEnabled?: boolean
}

type DatePickerModelValue = null | Date

type DBResponseType = DeadlineItem[] | Options | null

export type { DatePickerModelValue, DeadlineItem, Options, DBResponseType }
