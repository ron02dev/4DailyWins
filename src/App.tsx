import Aside from "./components/Aside";

import { createContext, useContext, useEffect, useReducer } from "react";
import Topics from "./components/content/Topics";
import "./css/App.css";
import useDB from "./hooks/useDB";
import useDate from "./hooks/useDate";

// INITIALIZED DATA FOR REDUCER
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
  messageType: "",
};

// REDUCER FUNCTIONS
function reducer(
  state: typeof initialAppData,
  action: ACTIONTYPE
): InitialState {
  switch (action.type) {
    case "REMOVE_FROM_ALL_WINS":
      return {
        ...state,
        allWins: state.allWins.filter(
          (win) => win.date_logged !== action.payload
        ),
      };
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
    case "ADD_TO_ALL_WINS":
      return {
        ...state,
        allWins: [...state.allWins, action.payload],
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
        serverMessage: action.payload.serverMessage ?? "",
        messageType: action.payload.messageType ?? "",
      };
    default:
      return state;
  }
}

// CONTEXT INITIALIZED
const DailyWinContext = createContext<DailyWinContext | null>(null);

// APP--APP--APP--APP--APP
function App() {
  const [appData, dispatch] = useReducer(reducer, initialAppData);
  const { getDMY } = useDate();
  const { addDailyWin, getDailyWins, removeDailyWin } = useDB();

  // ---------------MAIN FUNCTION
  async function handleLogDailyWin() {
    // compile all wins

    const compiledDailyWin: DailyWin = {
      wins: appData.wins,
      wins_completed: appData.wins.length,
      date_logged: "9/8/2025",
    };

    // if wins has value
    if (appData.wins.length > 0) {
      try {
        const resp = await addDailyWin(compiledDailyWin);
        console.log(resp, "resp");
        dispatch({ type: "LOG_DAILY_WIN", payload: compiledDailyWin });
        dispatch({ type: "ADD_TO_ALL_WINS", payload: compiledDailyWin });
        dispatch({
          type: "SET_SERVER_MESSAGE",
          payload: {
            serverMessage: `Wins Logged, Total : ${compiledDailyWin.wins_completed}`,
            messageType: "success",
          },
        });
      } catch (handleLogDailyWinError) {
        console.log(handleLogDailyWinError);
        dispatch({
          type: "SET_SERVER_MESSAGE",
          payload: {
            serverMessage:
              "Something went wrong on our side. Please try again later.",
            messageType: "error",
          },
        });
      }
    } else {
      removeDailyWin(getDMY());
      dispatch({
        type: "REMOVE_DAILY_WIN",
        payload: getDMY(),
      });
      dispatch({
        type: "SET_SERVER_MESSAGE",
        payload: {
          serverMessage: `No wins logged`,
          messageType: "warning",
        },
      });
    }
  }

  // DISSAPEARING MESSAGES
  useEffect(() => {
    const messageDelay = setTimeout(
      () =>
        dispatch({
          type: "SET_SERVER_MESSAGE",
          payload: { serverMessage: "", messageType: "" },
        }),
      1000
    );
    return () => {
      clearTimeout(messageDelay);
    };
  }, [appData.serverMessage]);

  useEffect(() => {
    getWinsFromDB();
  }, []);

  useEffect(() => {
    console.log(appData.wins, "APP.TSX:{value:appData.Wins} ");
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
              <button onClick={handleLogDailyWin} className="log-btn">
                Log Wins
              </button>
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
