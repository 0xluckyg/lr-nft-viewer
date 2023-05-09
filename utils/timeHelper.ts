import moment, { Moment } from 'moment'

export function getTimeFromNow(time: number): string {
  const expiryMoment: Moment = moment.unix(time)
  const currentTime: Moment = moment()

  const isAfter: boolean = expiryMoment.isAfter(currentTime)

  return `${moment.duration(expiryMoment.diff(currentTime)).humanize()} ${
    isAfter ? 'from now' : 'ago'
  }`
}
