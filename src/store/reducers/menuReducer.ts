import {IMenuState} from "../types/interfaces/stateInterfaces";
import {CHANGE_CURRENCY, GET_MENU} from "../constants/constants";

const initialState: IMenuState = {
  menuList: [],
  currency: {
    rate: 1,
    symbol: 'fa-rub'
  }
};


export default function menuReducer(state=initialState, action) {

  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        menuList: [...action.menu]
      }
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: {
          rate: action.rate,
          symbol: action.symbol
        }
      }
    default:
      return state;
  }
}
