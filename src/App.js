import Routes from "./config/Routes";
import AppRouting from "./AppRouting";
import "./styles/App.scss";
import FullPageLoader from "./components/FullPageLoader";


function App() {
  return (
    <div className="App">
      <AppRouting routes={Routes}/>
      <FullPageLoader />
    </div>
  );
  
}


export default App;
