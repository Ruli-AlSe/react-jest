import "./App.css"
import LoginPage from "./pages/login/LoginPage"

function App() {
  return (
    <div className="App">
      <header style={{width: "100%", padding: "5rem 0"}}>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <LoginPage />
    </div>
  )
}

export default App
