export {};

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */

  type win_names = "mental" | "physical" | "emotional" | "spiritual";


  interface DailyWin {
    wins : Win[];
    wins_completed: number;
    date_logged : string;
  }

  interface Win {
    win_id: number;
    win_name: win_names;
    task_done: string[];
// or string if you prefer ISO format
  }

  // USEREDUCERS
  interface InitialState {
    wins: Win[];
    created_at: string; // Array of daily wins
  }

  type ACTIONTYPE =
    | { type: "SET_LOAD"; payload: boolean }
    | { type: "LOG_WINS"; payload: Win[]; created_at : string };

  // CONTEXT REFERENCE
  interface TodoContextType {
    appData: InitialState;
    dispatch: React.Dispatch<Action>;
  }
}
