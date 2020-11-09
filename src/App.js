import "./App.css";
import Routes from "./components/Routes";
import Navigation from "./components/Navigation";
import { withAuthentication } from "./components/Session";

function App(props) {
  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}

export default withAuthentication(App);
