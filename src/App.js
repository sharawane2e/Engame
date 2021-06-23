import Routes from "./config/Routes";
import AppRouting from "./AppRouting";
import "./styles/App.scss";


function App() {
  return (
    <div className="App">
      <AppRouting routes={Routes} />
    </div>
  );
}

export default App;
