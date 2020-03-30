import moment from 'moment';

export function formatDate(date, format) {
  if (!date) {
    return date;
  }
  return moment(date).format(format);
}

export function prettyNumber(num) {
  if (!num) {
    return num;
  }
  return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
