import axios from 'axios';
import {enviroment} from '../enviroment';
import {DefaultThunkType} from "../../common/defaultTypes";
import {getUserOrders} from "../actions/auth";

export const getOrdersThunk = (id: string, email: string): DefaultThunkType => {
    return dispatch => {
        axios.post(`${enviroment.baseUrl}get_orders`, {id: id, email: email})
            .then(res => dispatch(getUserOrders(res.data)))
            .catch(() => dispatch(getUserOrders([])))
    }
}
