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
