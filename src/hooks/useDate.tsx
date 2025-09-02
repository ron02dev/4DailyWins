export default function useDate() {
  function getDMY() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDay();
    return `${month}/${day}/${year}`;
  }

  return { getDMY };
}
