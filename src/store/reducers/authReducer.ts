import {GET_USER_ORDERS, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT} from "../constants/constants";
import {IAuthState} from "../types/interfaces/stateInterfaces";

const initialState: IAuthState = {
    isLogin: false,
    loginWarning: '',
    user: {}
};


export default function authReducer(state=initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                loginWarning: '',
                user: {...action.user}
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginWarning: action.error,
            }
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                loginWarning: '',
                user: {}
            }
        case GET_USER_ORDERS:
            return {
                ...state,
                user: {
                    ...state.user,
                    orders: [...action.orders]
                }
            }
        default:
            return state;
    }
}
