import Aside from "./components/Aside";
import { useReducer } from "react";
import Topics from "./components/content/Topics";
import "./css/App.css";

const initialAppData: InitialState = {
  wins: [],
  isFetching: false,
  serverMessage: "",
};

// REDUCER FUNCTIONS
function reducer(
  state: typeof initialAppData,
  action: ACTIONTYPE
): InitialState {
  switch (action.type) {
   
    default:
      return state;
  }
}

function App() {
  const [appData, dispatch] = useReducer(reducer, initialAppData);
  return (
    <>
      <main className="app-container">
        <Aside />

        <div className="content">
          <header className="content-header"></header>

          <Topics />
        </div>
      </main>
    </>
  );
}

export default App;
