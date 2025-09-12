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
            autoIncrement: false,
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
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const getRequest = store.get(dailyWin.date_logged);

      getRequest.onsuccess = () => {
        if (getRequest.result === undefined) {
          // Doesn't exist, add new
          const addRequest = store.add({ id: dailyWin.date_logged, dailyWin });
          addRequest.onsuccess = () => resolve(addRequest.result);
          addRequest.onerror = () => reject(addRequest.error);
        } else {
          // Exists, update
          const putRequest = store.put({ id: dailyWin.date_logged, dailyWin });
          putRequest.onsuccess = () => resolve(putRequest.result);
          putRequest.onerror = () => reject(putRequest.error);
        }
      };

      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    });
  }

  async function removeDailyWin(id: string) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const request = store.delete(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function findDailyWin(id: string) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function getDailyWins(): Promise<any[]> {
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

  return { openDB, addDailyWin, getDailyWins, findDailyWin, removeDailyWin };
}
