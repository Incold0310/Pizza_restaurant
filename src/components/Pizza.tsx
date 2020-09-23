import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {changingOrder} from "../store/thunks/changingOrder";
import {IPizza} from "../store/types/interfaces/stateInterfaces";
import {RootState} from "../store/reducers/rootReducer";
import {ThunkDispatch} from "redux-thunk";
import {Thunk} from "../common/defaultTypes";

const images = require.context('../assets/images/pizza', true);

interface IPizzaComponent {
  pizzaData: IPizza
}

const connector = connect(
    (state: RootState) => ({
      currency: state.menu.currency
    }),
    (dispatch: Thunk) => ({
      addPizza(pizzaData: IPizza) {
        dispatch(changingOrder('new', pizzaData))
      }
    })
)

function Pizza(props: IPizzaComponent & ConnectedProps<typeof connector>) {
  return (
    <div className="col-3 mt-3">
      <div className="container-fluid pizza p-0">
        <div>
          <img src={images(`./${props.pizzaData.pizzaName}.jpg`)} alt="pizza"/>
        </div>
        <div className="text-center mt-2 recipe">
          <span className="font-weight-bold">{props.pizzaData.pizzaName}</span>
          <div className="my-3 text-left">
            <ul>
              {
                props.pizzaData.ingridients.map( (ingridient, index) =>
                  <li key={index}>{ingridient.charAt(0).toUpperCase() + ingridient.slice(1)}</li>
                )
              }
            </ul>
          </div>
        </div>
        <div className="order">
          <hr className="my-2" />
          <div className="row my-2">
            <div className="col font-weight-bold d-flex align-items-center justify-content-center">
              <span>{(props.pizzaData.price*props.currency.rate).toFixed(2)} <i className={`fa ${props.currency.symbol}`}></i></span>
            </div>
            <div className="col text-center">
              <button className="btn btn-outline-warning" onClick={() => props.addPizza(props.pizzaData)}>Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connector(React.memo(Pizza));
