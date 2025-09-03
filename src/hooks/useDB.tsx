export default function useDB() {
  const DB_NAME = "DAILYWINSDB";
  const DB_VERSION = 1;
  const STORE_NAME = "wins";

  function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function addDailyWin(dailyWin: DailyWin) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      // reject(new Error("Forced failure for test"));
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const request = store.add({ dailyWin });

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async function getDailyWins(month?: string): Promise<any[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);

      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result); // this is the new id
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  return { openDB, addDailyWin, getDailyWins };
}
