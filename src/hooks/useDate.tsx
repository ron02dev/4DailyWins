export default function useDate() {
  function getDMY() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDay();
    return `${month + 1}/${day}/${year}`;
  }

  return { getDMY };
}
