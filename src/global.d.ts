export {};

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */

  type win_type = "mental" | "physical" | "emotional" | "spiritual";
  type messageType = "success" | "loading" | "error" | "warning" | "";
  interface Win {
    win_type: win_type;
    task_done: string;
    // or string if you prefer ISO format
  }

  interface DailyWin {
    wins: Win[];
    wins_completed: number;
    date_logged: string;
  }

  interface DailyWinRecord {
    dailyWin: DailyWin; 
    id: string; // e.g., '9/10/2025'
    // assuming you already have a DailyWin interface
  }

  // USEREDUCERS
  interface InitialState {
    dailyWin: DailyWin;
    wins: Win[];
    allWins: DailyWin[];
    isFetching: boolean;
    serverMessage: string;
    messageType: string;
    activeDates: string[];
    winHistory: Win[];
  }

  type ACTIONTYPE =
    | {
        type: "SET_SERVER_MESSAGE";
        payload: { serverMessage: string; messageType?: string };
      }
    | { type: "LOAD_ALL_WINS"; payload: DailyWin[] }
    | { type: "LOG_WIN"; payload: Win }
    | { type: "LOG_ALL_WINS"; payload: Win[] }
    | { type: "REMOVE_WIN"; payload: win_type }
    | { type: "LOAD_ALL_DATES"; payload: string[] }
    | { type: "ADD_TO_ACTIVE_DATES"; payload: string }
    | { type: "REMOVE_TO_ACTIVE_DATES"; payload: string }
    | { type: "LOAD_WIN_HISTORY"; payload: Win[] }
    | { type: "CLEAR_WIN_HISTORY" }
    | { type: "ADD_TO_ALL_WINS"; payload: DailyWin };

  // CONTEXT REFERENCE
  interface DailyWinContext {
    appData: InitialState;
    dispatch: React.Dispatch<Action>;
  }
}
