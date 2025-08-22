import Aside from "./components/Aside";

import Topics from "./components/content/Topics";
import "./css/App.css";
function App() {
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
