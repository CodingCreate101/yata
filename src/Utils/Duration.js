function pad(string) {
  return `0${string}`.slice(-2);
}

export function formatWithDetails(milliseconds) {
  const date = new Date(milliseconds);
  const year = date.getUTCFullYear() - 1970;
  const month = date.getUTCMonth();
  const dd = date.getUTCDate() - 1;

  // ? For future usage
  // const hh = date.getUTCHours();
  // const mm = date.getUTCMinutes();
  // const ss = pad(date.getUTCSeconds());
  // if (dd) {
  //   return `${dd}d ${pad(hh)}h ${pad(mm)}m ${ss}s`; // 30 Days is MAX
  // }
  // if (hh) {
  //   return `${hh}h ${pad(mm)}m ${ss}s`;
  // }
  // if (year) {
  if (year) {
    return `${year}year(s) ${pad(month)}month(s) ${pad(dd)}day(s) ago`;
  }
  if (month) {
    return `${month}month(s) ${pad(dd)}day(s) ago`;
  }
  if (dd) {
    let suffix = "day";

    if (dd > 1) {
      suffix = "days";
    }
    return `${dd} ${suffix} ago`;
  }

  return "Today";
}

export function areWeInFuture(milliseconds) {
  const date = new Date(milliseconds);
  const year = date.getUTCFullYear() - 1970;
  const month = date.getUTCMonth();
  const dd = date.getUTCDate() - 1;

  return year || month || dd;
}
