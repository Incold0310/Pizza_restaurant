import React, {Suspense, lazy} from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Footer from './Footer';
import Basket from './Basket';
import Auth from "./Auth";
import {Switch, Route, Redirect} from 'react-router-dom';
import Loading from "../common/Loading";
import Delivery from "./Delivery";
import {connect, ConnectedProps} from "react-redux";
import UserAccount from "./UserAccount";
import {RootState} from "../store/reducers/rootReducer";

const Menu = lazy(() => new Promise<any>(resolve => {
    setTimeout(() => resolve(import("./Menu")), 500);
}));

const connector = connect(
    (state: RootState) => ({
        isLogin: state.auth.isLogin
    })
)

function App({isLogin}: ConnectedProps<typeof connector>) {
  return (
    <div className="container-fluid p-0 d-flex flex-fill flex-column h-100">
      <Navbar />
      <Switch>
       <Route exact path="/" component={Banner} />
       <Route path="/menu" render={() => <Suspense fallback={<Loading />}> <Menu /> </Suspense>} />
       <Route path="/basket" component={Basket} />
       <Route path="/delivery" component={Delivery} />
       <Route path="/auth" component={Auth} />
       <Route path="/account" render={() => isLogin ? <UserAccount /> : <Redirect to="/auth" />} />
       <Route>
           <Redirect to="/" />
       </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default connector(App);
