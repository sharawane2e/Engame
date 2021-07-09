import Routes from "./config/Routes";
import AppRouting from "./AppRouting";
import "./styles/App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <AppRouting routes={Routes} />
    </div>
  );
  
}


export default App;
