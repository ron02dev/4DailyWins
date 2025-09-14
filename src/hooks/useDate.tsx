export default function useDate() {
  function getDMY() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    return `${month + 1}/${day}/${year}`;
  }

  function toUIDate(date: string) {
    const [month, day, year] = date.split("/").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return { getDMY, toUIDate };
}
