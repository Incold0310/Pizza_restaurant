import {IBasketState} from "../types/interfaces/stateInterfaces";
import {
  ADD_PIZZA,
  CHANGE_PIZZA_COUNT,
  DELETE_PIZZA,
  SHOW_ORDER_MESSAGE,
  CLOSE_ORDER_MESSAGE,
  CLEAR_BASKET
} from "../constants/constants";

const initialState: IBasketState = {
  total: 0,
  count: 0,
  order: [],
  orderStatus: {
    text: '',
    style: ''
  }
};


export default function basketReducer(state=initialState, action) {

  switch (action.type) {
    case ADD_PIZZA:
      return {
        ...state,
        count: state.count + 1,
        total: state.total + action.newPizza.orderedPizza.price,
        order: [...state.order, action.newPizza]
      }
    case CHANGE_PIZZA_COUNT:
      return {
        ...state,
        total: state.total + action.price,
        order: [...action.order],
        count: state.count + action.count
      }
    case DELETE_PIZZA:
      return {
        ...state,
        count: state.count - action.count,
        total: state.total - action.price * action.count,
        order: [...action.order]
      }
    case SHOW_ORDER_MESSAGE:
      return {
        ...state,
        orderStatus: {
          ...state.orderStatus,
          text: action.text,
          style: action.style
        }
      }
    case CLOSE_ORDER_MESSAGE:
      return {
        ...state,
        orderStatus: {
          ...state.orderStatus,
          text: '',
          style: ''
        }
      }
    case CLEAR_BASKET:
      return {
        ...state,
        total: 0,
        count: 0,
        order: [],
        orderStatus: {
          text: '',
          style: ''
        }
      }
    default:
      return state;
  }
}
