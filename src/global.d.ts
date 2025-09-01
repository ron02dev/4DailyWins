export {};

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */

  type WinNames = "mental" | "physical" | "emotional" | "spiritual";

  interface Win {
    win_id: number;   
    winName: WinNames;
    task: string[];
    created_at: Date; // or string if you prefer ISO format
  }

  // USEREDUCERS
  interface InitialState {
    wins: Win[]; // Array of daily wins
    isFetching: boolean;
    serverMessage: string;
  }

  type ACTIONTYPE =
    | { type: "SET_LOAD"; payload: boolean }
    | { type: "LOAD_WINS"; payload: WinType[] }
    | { type: "CREATE_WIN"; payload: WinType }
    | { type: "EDIT_WIN"; payload: WinType }
    | { type: "SET_MESSAGE"; payload: string | "" };

  // CONTEXT REFERENCE
  interface TodoContextType {
    appData: InitialState;
    dispatch: React.Dispatch<Action>;
  }
}
