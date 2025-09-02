import Aside from "./components/Aside";
import useDate from "./hooks/useDate";
import { useEffect, useReducer } from "react";
import Topics from "./components/content/Topics";
import "./css/App.css";
import useDB from "./hooks/useDB";

const initialAppData: InitialState = {
  wins: [],
  created_at: "",
};

// REDUCER FUNCTIONS
function reducer(
  state: typeof initialAppData,
  action: ACTIONTYPE
): InitialState {
  switch (action.type) {
    case "LOG_WINS":
      return {
        ...state,
        wins: action.payload,
      };
    default:
      return state;
  }
}
// ---------------------------------------------------app
function App() {
  const [appData] = useReducer(reducer, initialAppData);
  const { getDMY } = useDate();
  const { openDB, addDailyWin } = useDB();

  // TEST DATA
  const currentWins: Win[] = [
    {
      win_id: 1,
      win_name: "mental",
      task_done: ["mental", "mental"],
    },
    {
      win_id: 2,
      win_name: "physical",
      task_done: ["phytodo", "phytodo"],
    },
    {
      win_id: 3,
      win_name: "spiritual",
      task_done: ["spiritual", "spiritual"],
    },
    {
      win_id: 4,
      win_name: "emotional",
      task_done: ["emotional", "emotional"],
    },
  ];

  // TEST DATA
  const dailyWin: DailyWin = {
    wins: currentWins,
    wins_completed: 0,
    date_logged: "9/3/2025",
  };

  function handleLog() {
    addDailyWin(dailyWin);
    // dispatch({ type: "LOG_WINS", payload: wins, created_at });
  }

  useEffect(() => {
    // console.log(appData);
  }, [appData]);

  useEffect(() => {
    console.log("DB CONNECTION OPEN");
  }, [openDB]);

  return (
    <>
      <main className="app-container">
        <Aside />

        <div className="content">
          <header className="content-header">
            <button onClick={handleLog} className="btn log-btn">
              Log Wins
            </button>
          </header>

          <Topics />
        </div>
      </main>
    </>
  );
}

export default App;
