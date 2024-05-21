// helper functions

// format the date to DD-MM-YYYY
const monthNames = [
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
  'Dec'
];

export function getFormattedDate(date) {
  return `${('0' + date.getDate()).slice(-2)}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
}

// calculate the date of the day which is 'days' before 'date'.
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
