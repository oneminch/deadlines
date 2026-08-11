import { formatDistanceStrict, isToday, isBefore } from 'date-fns'

class DateUtils {
  /**
   * Get today's date object at midnight
   */

  static getToday = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return today
  }

  /**
   * Displays days left/passed for each deadline
   */
  static getRemainingDays = (date: Date): string => {
    if (isToday(date)) {
      return 'Today (0 days left)'
    } else {
      return formatDistanceStrict(date, this.getToday(), {
        unit: 'day',
        addSuffix: true,
        roundingMethod: 'floor',
      })
    }
  }

  /**
   * Check if date is today or in the past
   */
  static isDateOnOrBeforeToday = (date: Date): boolean => {
    return isBefore(date, this.getToday()) || isToday(date)
  }

  /**
   * Get Tomorrow's Date
   */
  static getTomorrow = () => {
    return ((d) => new Date(d.setDate(d.getDate() + 1)))(new Date())
  }

  /**
   * Format Date: MMM DD, YYYY
   */
  static formatDate = (date: Date) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const day = date.getDate().toString().padStart(2, '0')
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${month} ${day}, ${year}`
  }

  /**
   * Get Random Date
   */
  static getRandomDate = () => {
    const start = new Date(2012, 0, 1),
      end = new Date()

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  /**
   * Check if date is overdue
   */
  static isOverdue = (date: Date) => {
    return this.isDateOnOrBeforeToday(date)
  }
}

const circularAccess = <T>(arr: Array<T>, index: number) =>
  arr[((index % arr.length) + arr.length) % arr.length]

export { DateUtils, circularAccess }
