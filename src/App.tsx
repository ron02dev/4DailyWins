import Aside from "./components/Aside";
import "animate.css";

import { createContext, useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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
  winHistory: {
    selectedWinHistory: [],
    selectedDateHistory: "",
  },
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
    case "LOG_ALL_WINS":
      return {
        ...state,
        wins: action.payload,
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
    case "LOAD_WIN_HISTORY":
      return {
        ...state,
        winHistory: action.payload,
      };
    case "CLEAR_WIN_HISTORY":
      return {
        ...state,
        winHistory: { selectedWinHistory: [], selectedDateHistory: "" },
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
export const DailyWinContext = createContext<DailyWinContext | null>(null);

// APP--APP--APP--APP--APP
function App() {
  const [appData, dispatch] = useReducer(reducer, initialAppData);
  const { getDMY, toUIDate } = useDate();
  const { addDailyWin, getDailyWins } = useDB();
  const [isHowActive, setIsHowActive] = useState<boolean | null>(false);
  const [isHistoryActive, setisHistoryActive] = useState<boolean | null>(false);
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

  /* 
    DISSAPEARING MESSAGES
   useEffect(() => {
   const messageDelay = setTimeout(
      () =>
      dispatch({
         type: "SET_SERVER_MESSAGE",
         payload: { serverMessage: "", messageType: "" },
       }),
     2500
   );
  return () => {
     clearTimeout(messageDelay);
   };
 }, [appData.serverMessage]);
  
  
  */

  // WHEN VIEWING HISTORY ACTIVE
  useEffect(() => {
    if (appData.winHistory.selectedWinHistory.length > 0) {
      setisHistoryActive(true);
    } else {
      setisHistoryActive(false);
    }
  }, [appData.winHistory]);

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

        // load the current date
        const lastSavedDailyWin = ALLWINS_DATA_FROM_DB.find((obj: any) => {
          return obj["id"] == getDMY();
        });

        if (lastSavedDailyWin) {
          // LOAD THE WINS ON THAT CURRENT DATE
          const lastSavedWins = lastSavedDailyWin.dailyWin.wins;
          console.log(lastSavedDailyWin, lastSavedWins, "LAST SAVED WINS");
          dispatch({ type: "LOG_ALL_WINS", payload: lastSavedWins });
        }

        dispatch({ type: "LOAD_ALL_DATES", payload: date });
        dispatch({ type: "LOAD_ALL_WINS", payload: ALLWINS_DATA_FROM_DB });
        // WINS ARRAY
      } catch (fetchErrorFromDB) {
        console.log(fetchErrorFromDB);
      }
    }

    getWinsFromDB();
  }, []);

  function handleHowToUse() {
    setIsHowActive(!isHowActive);
  }

  useEffect(() => {
    if (appData.serverMessage.length > 2) {
      switch (appData.messageType) {
        case "success":
          const rand = Math.floor(Math.random() * 3) + 1;
          console.log(rand);
          if (rand == 2) {
            toast.info("Don't forget to your save progress");
          }
          toast.success(appData.serverMessage);

          break;
        case "error":
          toast.error(appData.serverMessage);
          break;
        case "warning":
          toast.warn(appData.serverMessage);
          break;
        default:
          toast.info(appData.serverMessage);
      }
    }
  }, [appData.serverMessage]);

  return (
    <>
      <DailyWinContext.Provider value={{ appData, dispatch }}>
        <main className="app-container">
          <Aside handleHowToUse={handleHowToUse} />

          {isHowActive ? (
            <HowToUse />
          ) : (
            <div className="content-main">
              <header className="content-header">
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  limit={5}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                {isHistoryActive ? (
                  <p className="log-message">
                    Viewing{" "}
                    <span className="log-message-highlight">
                      {toUIDate(appData.winHistory.selectedDateHistory)}
                    </span>{" "}
                    Logs
                  </p>
                ) : (
                  <button onClick={handleLogDailyWin} className="log-btn">
                    Save Progress
                  </button>
                )}
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
