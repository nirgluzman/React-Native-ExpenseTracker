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

// convert the input date string (DD.MM.YYYY) to JavaScript Date object format (YYYY-MM-DD).
export function convertDateString(dateString) {
  // Split the string using a dot (.) as delimiter.
  const parts = dateString.split('.');

  const year = parts[2];
  const month = parts[1];
  const day = parts[0];

  // return the date in JavaScript Date object format (YYYY-MM-DD).
  return `${year}-${month}-${day}`;
}

// calculate the date of the day which is 'days' before 'date'.
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
