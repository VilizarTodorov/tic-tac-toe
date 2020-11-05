import React from "react";

const FirebaseContext = React.createContext(null);

const withFirebase = (Component) => {
  return (props) => {
    return (
      <FirebaseContext.Consumer>
        {(firebase) => <Component {...props} firebase={firebase}></Component>}
      </FirebaseContext.Consumer>
    );
  };
};

export default withFirebase;
export { FirebaseContext };
