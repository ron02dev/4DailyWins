import Aside from "./components/Aside";

import { createContext, useContext, useEffect, useReducer } from "react";
import Topics from "./components/content/Topics";
import "./css/App.css";
import useDB from "./hooks/useDB";
import useDate from "./hooks/useDate";

// REDUCER FUNCTIONS
const initialAppData: InitialState = {
  dailyWin: {
    wins: [],
    wins_completed: 0,
    date_logged: "",
  },
  wins: [],
  allWins: [],
  isFetching: false,
  serverMessage: "",
};

function reducer(
  state: typeof initialAppData,
  action: ACTIONTYPE
): InitialState {
  switch (action.type) {
    case "LOG_DAILY_WIN":
      return {
        ...state,
        dailyWin: action.payload,
        allWins: [...state.allWins, action.payload],
      };
    case "LOAD_ALL_WINS":
      return {
        ...state,
        allWins: action.payload,
      };
    case "LOG_WIN":
      return {
        ...state,
        wins: [...state.wins, action.payload],
      };

    case "REMOVE_WIN":
      return {
        ...state,
        wins: state.wins.filter((win) => win.win_type !== action.payload),
      };
    case "SET_SERVER_MESSAGE":
      return {
        ...state,
        serverMessage: action.payload,
      };
    default:
      return state;
  }
}

// DEFINE CONTEXT
const DailyWinContext = createContext<DailyWinContext | null>(null);

// ---------------------------------------------------app
function App() {
  const [appData, dispatch] = useReducer(reducer, initialAppData);
  const { getDMY } = useDate();
  const { addDailyWin, getDailyWins } = useDB();

  // ---------------MAIN FUNCTION
  async function handleLogDailyWin() {
    const compiledDailyWin: DailyWin = {
      wins: appData.wins,
      wins_completed: appData.wins.length,
      date_logged: getDMY(),
    };
    if (appData.wins.length > 0) {
      try {
        const resp = await addDailyWin(compiledDailyWin);
        console.log(resp, "v12312");
        dispatch({ type: "LOG_DAILY_WIN", payload: compiledDailyWin });
        dispatch({
          type: "SET_SERVER_MESSAGE",
          payload: `Wins Logged, Total : ${compiledDailyWin.wins_completed}`,
        });
      } catch (handleLogDailyWinError) {
        console.log(handleLogDailyWinError);
        dispatch({
          type: "SET_SERVER_MESSAGE",
          payload: "Something went wrong on our side. Please try again later.",
        });
      }
    } else {
      dispatch({
        type: "SET_SERVER_MESSAGE",
        payload: "No wins logged",
      });
    }
  }

  // DISSAPEARING MESSAGES
  useEffect(() => {
    setTimeout(
      () => dispatch({ type: "SET_SERVER_MESSAGE", payload: "" }),
      2000
    );
  }, [appData.serverMessage]);

  useEffect(() => {
    getWinsFromDB();
  }, []);

  useEffect(() => {
    console.log(appData.wins, "APP.TSX");
  }, [appData]);

  async function getWinsFromDB() {
    try {
      const res = await getDailyWins();
      console.log(res, "LOAD DATA FROM DB: APP.TSX");
      dispatch({ type: "LOAD_ALL_WINS", payload: res });
    } catch (fetchErrorFromDB) {
      console.log(fetchErrorFromDB);
    }
  }

  return (
    <>
      <DailyWinContext.Provider value={{ appData, dispatch }}>
        <main className="app-container">
          <Aside />

          <div className="content">
            <header className="content-header">
              <button onClick={handleLogDailyWin} className="btn log-btn">
                Log Wins
              </button>
              <p>{appData.serverMessage}</p>
            </header>

            <Topics />
          </div>
        </main>
      </DailyWinContext.Provider>
    </>
  );
}

export default App;

export function useDailyWinContext() {
  const context = useContext(DailyWinContext);
  if (!context) {
    throw new Error("useDailyWinContext must be used inside TodoProvider");
  }
  return context;
}
