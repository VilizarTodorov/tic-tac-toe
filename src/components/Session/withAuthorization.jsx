import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "./index";
import { compose } from "recompose";
import { SIGN_IN } from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          this.props.history.push(SIGN_IN, { from: this.props.location.pathname });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) => (condition(authUser) ? <Component {...this.props}></Component> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
