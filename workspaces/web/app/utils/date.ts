export function formatDate(ts: number) {
  const date = new Date(ts);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${
    months[date.getMonth() - 1]
  } ${date.getDate()}, ${date.getFullYear()}`;
}
