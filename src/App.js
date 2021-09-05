import Routes from "./config/Routes";
import AppRouting from "./AppRouting";
import FullPageLoader from "./components/FullPageLoader";
import { ToastContainer } from "react-toastify";
import "./styles/App.scss";


function App() {
  return (
    <div className="App">
      <AppRouting routes={Routes} />
      <ToastContainer closeButton />
      <FullPageLoader />
    </div>
  );
}

export default App;
