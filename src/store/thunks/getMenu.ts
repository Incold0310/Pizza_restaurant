import axios from 'axios';
import {enviroment} from '../enviroment';
import {getMenuAction} from "../actions/menu";
import {DefaultThunkType} from "../../common/defaultTypes";

export const getMenu = (): DefaultThunkType => {
  return dispatch => {
    axios.get(`${enviroment.baseUrl}getmenu`)
    .then(res => dispatch(getMenuAction([...res.data])))
    .catch(() => dispatch(getMenuAction([])))
  }
}
