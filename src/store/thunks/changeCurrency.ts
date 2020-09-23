import axios from 'axios';
import {changeCurrencyAction} from "../actions/menu";
import {DefaultThunkType} from "../../common/defaultTypes";

export const changeCurrency = (currency: string): DefaultThunkType => {
  return dispatch => {
    if (currency === 'RUB') {
      return dispatch(changeCurrencyAction(1, 'fa-rub'))
    }
    else {
      axios.get(`https://api.exchangeratesapi.io/latest?base=RUB&symbols=${currency}`)
      .then(res => dispatch(
          changeCurrencyAction(res.data.rates[currency], currency === 'EUR' ? 'fa-euro' : 'fa-dollar')
      ))
      .catch(() => dispatch(changeCurrencyAction(1, 'fa-rub')))
    }
  }
}