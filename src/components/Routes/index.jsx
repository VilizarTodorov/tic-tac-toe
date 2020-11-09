import React, { Suspense } from "react";
import * as ROUTES from "../../constants/routes";
import { Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import("../Home"));
const SignUp = React.lazy(() => import("../SignUp"));
const SignIn = React.lazy(() => import("../SignIn"));
const Rooms = React.lazy(() => import("../Rooms"));
const GameBoard = React.lazy(() => import("../GameBoard"));

const Routes = (props) => {
  return (
    <Switch>
      <Suspense fallback={<h1>...Loading</h1>}>
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
          <GameBoard />
        </Route>
      </Suspense>
    </Switch>
  );
};

export default Routes;
