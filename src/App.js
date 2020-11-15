import "./App.css";
import Routes from "./components/Routes";
import Header from "./components/Header";
import { withAuthentication } from "./components/Session";

function App(props) {
  return (
    <div className="App">
      <Header></Header>
      <Routes />
    </div>
  );
}

export default withAuthentication(App);
