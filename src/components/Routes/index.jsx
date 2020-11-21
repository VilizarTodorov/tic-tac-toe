import React, { Suspense } from "react";
import * as ROUTES from "../../constants/routes";
import { Route, Switch, useLocation } from "react-router-dom";
import { useTransition, animated, config } from "react-spring";
import "./styles.css";

const Home = React.lazy(() => import("../Home"));
const SignIn = React.lazy(() => import("../SignIn"));
const SignUp = React.lazy(() => import("../SignUp"));
const Rooms = React.lazy(() => import("../Rooms"));
const GameRoom = React.lazy(() => import("../GameRoom"));
const Profile = React.lazy(() => import("../Profile"));
const ChangePassword = React.lazy(() => import("../ChangePassword"));
const ResetPassword = React.lazy(() => import("../ResetPassword"));
const LeaderBoard = React.lazy(() => import("../LeaderBoard"));

const Routes = (props) => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 0,
      transform: "translate(50%,0%)",
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    enter: { opacity: 1, transform: "translate(0%,0%)" },
    leave: { opacity: 0, transform: "translate(-50%,0%)" },
    config: { ...config.gentle },
  });

  return (
    <main className="App-main">
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Suspense fallback={"...Loading"}>
            <Switch location={item}>
              <Route exact path={ROUTES.HOME}>
                <Home />
              </Route>

              <Route exact path={ROUTES.SIGN_UP}>
                <SignUp />
              </Route>

              <Route exact path={ROUTES.SIGN_IN}>
                <SignIn />
              </Route>

              <Route exact path={ROUTES.ROOMS}>
                <Rooms />
              </Route>

              <Route exact path={ROUTES.GAME_ROOM}>
                <GameRoom />
              </Route>

              <Route exact path={ROUTES.PROFILE}>
                <Profile />
              </Route>

              <Route exact path={ROUTES.CHANGE_PASSWORD}>
                <ChangePassword />
              </Route>

              <Route exact path={ROUTES.RESET_PASSWORD}>
                <ResetPassword />
              </Route>

              <Route exact path={ROUTES.LEADER_BOARD}>
                <LeaderBoard />
              </Route>
            </Switch>
          </Suspense>
        </animated.div>
      ))}
    </main>
  );
};

export default Routes;
