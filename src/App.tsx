import Aside from "./components/Aside";
import useDate from "./hooks/useDate";
import { useEffect, useReducer } from "react";
import Topics from "./components/content/Topics";
import "./css/App.css";

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
  const [appData, dispatch] = useReducer(reducer, initialAppData);
  const { getCurrentDate } = useDate();

  function handleLog() {
    console.log("LOG WINS");
    const wins: Win[] = [
      {
        win_id: 1,
        win_name: "mental",
        task_done: ["mental", "mental"],
        created_at: getCurrentDate(),
      },
      {
        win_id: 2,
        win_name: "physical",
        task_done: ["phytodo", "phytodo"],
        created_at: getCurrentDate(),
      },
      {
        win_id: 3,
        win_name: "spiritual",
        task_done: ["spiritual", "spiritual"],
        created_at: getCurrentDate(),
      },
      {
        win_id: 4,
        win_name: "emotional",
        task_done: ["emotional", "emotional"],
        created_at: getCurrentDate(),
      },
    ];
    const created_at = getCurrentDate();
    dispatch({ type: "LOG_WINS", payload: wins, created_at });
  }

  useEffect(() => {
    console.log(appData);
  }, [appData]);

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
