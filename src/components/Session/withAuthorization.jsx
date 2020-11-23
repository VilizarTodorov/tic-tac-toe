import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "./index";
import { compose } from "recompose";
import { SIGN_IN, HOME } from "../../constants/routes";

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
        if (!condition(authUser)) {
          if (this.props.location.pathname === "/sign-in" || this.props.location.pathname === "/sign-up") {
          
            this.props.history.push(HOME);
            return;
          }
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
          {(authUser) => (condition(authUser) ? <Component user={authUser} {...this.props}></Component> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
