export default function convertSecondsToDisplayString(seconds) {
  // This is a bit of a hack taken from https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
  // It works because when you create a date it is technically the milliseconds from 1/1/1970 at 12am.
  // So new Date(80 * 1000) would be 1/1/1970 at 00:01:20 (12:01:20 am). You can then convert it to a string using toISOString(),
  // and use slice(11, 19) to get just the HH:MM:SS or slice(14, 19) to get the MM:SS.
  // I decided that if seconds < 3600 (aka, the timer is less than one hour), that the hour digits shouldn't be returned, but that is a matter of preference & what you want the app to do

  // Also, I put this function in a new folder `src/util/` since it may be needed in more than one component

  // NOTE this method has one MAJOR limitation, which is that it can only support converting seconds less than 24 hours, can you figure out why? What would happen if you used this method to convert 86400 seconds?
  const isoDate = new Date(seconds * 1000).toISOString()
  return seconds < 3600 ? isoDate.slice(14, 19) : isoDate.slice(11, 19)
}
