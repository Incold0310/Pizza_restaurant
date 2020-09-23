import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import OrderItem from './OrderItem';
import OrderForm from './OrderForm';
import {Link} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {RootState} from "../store/reducers/rootReducer";
import {IOrderedPizza} from "../store/types/interfaces/stateInterfaces";

const connector = connect(
    (state: RootState) => ({
        order: state.basket.order as IOrderedPizza[],
        count: state.basket.count,
        total: state.basket.total,
        currency: state.menu.currency
    })
);

function Basket(props: ConnectedProps<typeof connector>) {
  return (
    <div className="d-flex flex-fill" id="basket">
      <div className="row container-fluid">
      {
        props.count
          ? (
            <>
              <div className="col">
                <h4 className="display-4">Your order:</h4>
                <hr className="m-2"/>
                <TransitionGroup component={null}>
                  {
                    props.order.map(item =>
                      <CSSTransition
                        key={item.orderedPizza._id}
                        timeout={300}
                        classNames="orderItemExit"
                      >
                        <OrderItem pizzaData={item} />
                      </CSSTransition>
                    )
                  }
                </TransitionGroup>
                <Link type="button" className="btn btn-warning my-3" to="/menu">Return to menu</Link>
                <hr className="m-2"/>
                <div className="row totalSum mb-3">
                  <div className="col text-left pl-4 ml-2">Total:</div>
                  <div className="col text-center">
                    {(props.total*props.currency.rate).toFixed(2)} <i className={`fa ${props.currency.symbol}`}></i>
                  </div>
                </div>
              </div>
              <div className="col d-flex align-items-center container-fluid justify-content-center">
                <OrderForm />
              </div>
            </>
          )
          : (
            <div className="container-fluid d-flex align-items-center justify-content-center">
              <div className="text-center">
                <h2 className="display-2">Your shopping cart is empty</h2>
                <Link type="button" className="btn btn-warning my-3 btn-lg" to="/menu">Return to menu</Link>
              </div>
            </div>
          )
      }
      </div>
    </div>
  )
}

export default connector(Basket);
