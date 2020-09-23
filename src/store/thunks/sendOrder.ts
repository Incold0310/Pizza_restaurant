import axios from 'axios';
import {enviroment} from '../enviroment';
import {DefaultThunkType} from "../../common/defaultTypes";
import {OrderFormValues} from "../../components/OrderForm";
import {showOrderAlert} from "../actions/alert";
import {clearBasket} from "../actions/basket";

export const sendOrder = (formData: OrderFormValues): DefaultThunkType => {
    return (dispatch, getState) => {

        let data = {
            userId: getState().auth.user.account ? getState().auth.user.account._id : 'anonymous',
            userInfo: formData,
            order: getState().basket.order,
            total: getState().basket.total
        }

        axios.post(`${enviroment.baseUrl}add_order`, data)
            .then(res => {
                dispatch(showOrderAlert(res.data, 'success'));
                setTimeout(() => dispatch(clearBasket()), 5000)
            })
            .catch(err => dispatch(showOrderAlert(err.data, 'danger')))
    }
}
