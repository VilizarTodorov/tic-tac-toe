import "./App.css";
import Routes from "./components/Routes";
import Header from "./components/Header";
import { withAuthentication } from "./components/Session";
import "./utils/commonCss/page.css";
import "./utils/commonCss/page-content.css";
import "./utils/commonCss/page-form.css";
import "./utils/commonCss/form-input.css";
import "./utils/commonCss/submit-button.css";
import "./utils/commonCss/form-link.css";
import "./utils/commonCss/component-container.css";
import "./utils/commonCss/o.css"
import "./utils/commonCss/x.css"

function App(props) {
  return (
    <div className="App">
      <Header></Header>
      <Routes />
    </div>
  );
}

export default withAuthentication(App);
