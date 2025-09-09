import Aside from "./components/Aside";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Topics from "./components/content/Topics";
import "./css/App.css";
import useDB from "./hooks/useDB";
import useDate from "./hooks/useDate";
import HowToUse from "./components/HowToUse";

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
  activeDates: [],
};

// REDUCER FUNCTIONS
function reducer(
  state: typeof initialAppData,
  action: ACTIONTYPE
): InitialState {
  switch (action.type) {
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
    case "ADD_TO_ALL_WINS":
      return {
        ...state,
        allWins: state.allWins.map((win) =>
          win.date_logged === action.payload.date_logged ? action.payload : win
        ),
      };

    case "SET_SERVER_MESSAGE":
      return {
        ...state,
        serverMessage: action.payload.serverMessage ?? "",
        messageType: action.payload.messageType ?? "",
      };

    case "LOAD_ALL_DATES":
      return {
        ...state,
        activeDates: action.payload,
      };

    case "ADD_TO_ACTIVE_DATES":
      return {
        ...state,
        activeDates: [...state.activeDates, action.payload],
      };

    case "REMOVE_TO_ACTIVE_DATES":
      return {
        ...state,
        activeDates: state.activeDates.filter(
          (date) => date !== action.payload
        ),
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
  const { addDailyWin, getDailyWins } = useDB();
  const [isHowActice, setIsHowActive] = useState<boolean | null>(false);
  // ---------------MAIN FUNCTION
  async function handleLogDailyWin() {
    const today = getDMY();
    const compiledDailyWin: DailyWin = {
      wins: appData.wins,
      wins_completed: appData.wins.length,
      date_logged: today,
    };

    console.log(compiledDailyWin.wins_completed);
    // if wins has value
    if (compiledDailyWin.wins_completed > 0) {
      const resp = await addDailyWin(compiledDailyWin);
      console.log(resp, "resp");
      dispatch({ type: "ADD_TO_ALL_WINS", payload: compiledDailyWin });
      dispatch({
        type: "ADD_TO_ACTIVE_DATES",
        payload: compiledDailyWin.date_logged,
      });
      dispatch({
        type: "SET_SERVER_MESSAGE",
        payload: {
          serverMessage: `Wins Logged, Total : ${compiledDailyWin.wins_completed}`,
          messageType: "success",
        },
      });
    } else {
      dispatch({
        type: "REMOVE_TO_ACTIVE_DATES",
        payload: compiledDailyWin.date_logged,
      });

      dispatch({
        type: "SET_SERVER_MESSAGE",
        payload: {
          serverMessage: `Logged Wins removed`,
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

  // initial load
  useEffect(() => {
    // ON MOUNT LOAD ALL SAVED DATA FROM DB
    async function getWinsFromDB() {
      try {
        const ALLWINS_DATA_FROM_DB = await getDailyWins();
        console.log(ALLWINS_DATA_FROM_DB, "LOADED DATA FROM DB");
        const date = ALLWINS_DATA_FROM_DB.map((item: any) => {
          return item["id"];
        });
        dispatch({ type: "LOAD_ALL_DATES", payload: date });
        dispatch({ type: "LOAD_ALL_WINS", payload: ALLWINS_DATA_FROM_DB });
      } catch (fetchErrorFromDB) {
        console.log(fetchErrorFromDB);
      }
    }

    getWinsFromDB();
  }, []);

  function handleHowToUse() {
    setIsHowActive(!isHowActice);
  }

  return (
    <>
      <DailyWinContext.Provider value={{ appData, dispatch }}>
        <main className="app-container">
          <Aside handleHowToUse={handleHowToUse} />

          {isHowActice ? (
            <HowToUse />
          ) : (
            <div className="content">
              <header className="content-header">
                <button onClick={handleLogDailyWin} className="log-btn">
                  Log Wins
                </button>
              </header>

              <Topics />
            </div>
          )}
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

// compile all wins

// const compiledDailyWin: DailyWin = {
//   wins: appData.wins,
//   wins_completed: appData.wins.length,
//   date_logged: "9/8/2025",
// };

// // if wins has value
// if (appData.wins.length > 0) {
//   try {
//     const resp = await addDailyWin(compiledDailyWin);
//     console.log(resp, "resp");
//     dispatch({ type: "LOG_DAILY_WIN", payload: compiledDailyWin });
//     dispatch({ type: "ADD_TO_ALL_WINS", payload: compiledDailyWin });
//     dispatch({
//       type: "SET_SERVER_MESSAGE",
//       payload: {
//         serverMessage: `Wins Logged, Total : ${compiledDailyWin.wins_completed}`,
//         messageType: "success",
//       },
//     });
//   } catch (handleLogDailyWinError) {
//     console.log(handleLogDailyWinError);
//     dispatch({
//       type: "SET_SERVER_MESSAGE",
//       payload: {
//         serverMessage:
//           "Something went wrong on our side. Please try again later.",
//         messageType: "error",
//       },
//     });
//   }
// } else {
//   removeDailyWin(getDMY());
//   dispatch({
//     type: "REMOVE_FROM_ALL_WINS",
//     payload: getDMY(),
//   });
//   dispatch({
//     type: "SET_SERVER_MESSAGE",
//     payload: {
//       serverMessage: `No wins logged`,
//       messageType: "warning",
//     },
//   });
// }
