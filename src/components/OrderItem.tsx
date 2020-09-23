import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {changingOrder} from '../store/thunks/changingOrder';
import {RootState} from "../store/reducers/rootReducer";
import {ThunkDispatch} from "redux-thunk";
import {IOrderedPizza, IPizza} from "../store/types/interfaces/stateInterfaces";
import {Thunk} from "../common/defaultTypes";


const images = require.context('../assets/images/pizza', true);

interface IOrderItemComponent {
    pizzaData: IOrderedPizza
}

const connector = connect(
    (state: RootState) => ({
        currency: state.menu.currency
    }),
    (dispatch: Thunk) => ({
        changeOrder(type: string, pizza: IPizza) {
            dispatch(changingOrder(type, pizza))
        }
    })
)

function OrderItem(props: IOrderItemComponent & ConnectedProps<typeof connector>) {
  const {orderedPizza, count} = props.pizzaData;
  return (
    <div className="row d-flex align-items-center orderItem my-2">
      <div className="col-3">
        <img src={images(`./${orderedPizza.pizzaName}.jpg`)} alt="pizza"/>
      </div>
      <div className="col-3 text-center orderItemInfo">
        <div className="font-italic">{orderedPizza.pizzaName}</div>
      </div>
      <div className="col-2">
        <div className="row p-0">
          <div className='col d-flex justify-content-center align-items-center pl-0'>
            <button className="btn btn-outline-success rounded-circle btn-sm"
              onClick={() => props.changeOrder('plus', orderedPizza)}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
          <div className='col text-center orderItemInfo p-0'>
            <div>{count}</div>
          </div>
          <div className='col d-flex justify-content-center align-items-center pr-0'>
            <button className="btn btn-outline-danger rounded-circle btn-sm"
                    onClick={() => props.changeOrder('minus', orderedPizza)}
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="col-3 text-center orderItemInfo">
        <div>{(orderedPizza.price*props.currency.rate*count).toFixed(2)} <i className={`fa ${props.currency.symbol}`}></i></div>
      </div>
      <div className="col-1 text-center pl-0">
        <button className="btn" onClick={() => props.changeOrder('delete', orderedPizza)}>
          <i className="fa fa-close fa-2x"></i>
        </button>
      </div>
    </div>
  )
}

export default connector(OrderItem);
