// helper functions

// convert the date format from DD/MM/YYYY to JavaScript Date object format.
export function convertDateString(dateString) {
  // split the string using "/" as delimiter.
  const [day, month, year] = dateString.split('/');

  // create a JavaScript Date object from the date string.
  const dateObj = new Date(+year, +month - 1, +day); // NOTE: the month should be 0-indexed when using 'new Date(year, month, ...)'

  // return the date in JavaScript Date object format.
  return dateObj;
}

// calculate the date of the day which is 'days' before 'date'.
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
