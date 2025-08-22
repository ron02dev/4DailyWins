import Aside from "./components/Aside";
import ThemeSwitch from "./components/ThemeSwitch";
import Topics from "./components/content/Topics";
import "./css/App.css";
function App() {
  return (
    <>
      <main className="app-container">
        <Aside />

        <div className="content">
          <header className="content-header">
            <button className="">Log 4 Wins</button>

            <ThemeSwitch />
          </header>
          <div className="topic-container">
            <Topics />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
