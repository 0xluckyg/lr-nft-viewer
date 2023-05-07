import moment from 'moment'

export function getTimeFromNow(time: number) {
  const expiryMoment = moment.unix(time)
  const currentTime = moment()

  const isAfter = expiryMoment.isAfter(currentTime)

  return `${moment.duration(expiryMoment.diff(currentTime)).humanize()} ${
    isAfter ? 'from now' : 'ago'
  }`
}
