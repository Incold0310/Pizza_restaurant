import React from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {Alert} from "react-bootstrap";

const connector = connect(
    (state: RootState) => ({
        warning: state.auth.loginWarning,
        isLogin: state.auth.isLogin
    })
);

function Auth({warning, isLogin}: ConnectedProps<typeof connector>) {
  if (isLogin) return <Redirect to="/account"/>
  return (
    <div className="container-fluid d-flex justify-content-center flex-fill align-items-center" id="auth">
        <div className="col-5" id="auth">
            {warning && <Alert variant="danger">{warning}</Alert>}
              <Switch>
                  <Route path="/auth/signin" component={SignIn} />
                  <Route path="/auth/signup" component={SignUp} />
                  <Route>
                      <Redirect to='/auth/signin' />
                  </Route>
              </Switch>
        </div>
    </div>
  );
}

export default connector(Auth);
