import {GET_USER_ORDERS, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT} from "../constants/constants";
import {AuthActionType} from "../types/interfaces/actionsInterfaces";
import {IOrderedPizza, IUser} from "../types/interfaces/stateInterfaces";

export const loginSuccess = (user: IUser): AuthActionType => {
    return {
        type: LOGIN_SUCCESS,
        user: user
    }
}

export const loginFailed = (error: string): AuthActionType => {
    return {
        type: LOGIN_FAILED,
        error: error
    }
}

export const logoutAction = (): AuthActionType => {
    return {
        type: LOGOUT
    }
}

export const getUserOrders = (orders: IOrderedPizza[]) : AuthActionType => {
    return {
        type: GET_USER_ORDERS,
        orders: orders
    }
}