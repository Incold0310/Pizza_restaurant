import {
    ADD_PIZZA,
    CHANGE_CURRENCY,
    CHANGE_PIZZA_COUNT, CLEAR_BASKET, CLOSE_ORDER_MESSAGE,
    DELETE_PIZZA,
    GET_MENU, GET_USER_ORDERS, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, SHOW_ORDER_MESSAGE
} from "../../constants/constants";
import {IOrderedPizza, IPizza, IUser} from "./stateInterfaces";

export interface IGetMenu {
    type: typeof GET_MENU
    menu: IPizza[]
}

export interface IChangeCurrency {
    type: typeof CHANGE_CURRENCY
    rate: number
    symbol: string
}

export interface IAddPizza {
    type: typeof ADD_PIZZA
    newPizza: IOrderedPizza
}

interface IBaseBasketAction {
    count: number
    price: number
    order: IOrderedPizza[]
}

export interface IDeletePizza extends IBaseBasketAction {
   type: typeof DELETE_PIZZA
}

export interface IChangePizzaCount extends IBaseBasketAction {
    type: typeof CHANGE_PIZZA_COUNT
}

interface IShowAlertAction {
    type: typeof SHOW_ORDER_MESSAGE,
    text: string | HTMLElement,
    style: string
}

interface ILoginSuccessAction {
    type: typeof LOGIN_SUCCESS
    user: IUser
}

interface ILoginFailedAction {
    type: typeof LOGIN_FAILED
    error: string
}

interface IGetOrdersAction {
    type: typeof GET_USER_ORDERS
    orders: IOrderedPizza[]
}

export type MenuActionType = IGetMenu | IChangeCurrency;

export type BasketActionType = IAddPizza | IDeletePizza | IChangePizzaCount | {type: typeof CLEAR_BASKET};

export type AlertActionType = IShowAlertAction | {type: typeof CLOSE_ORDER_MESSAGE};

export type AuthActionType = ILoginSuccessAction | ILoginFailedAction | IGetOrdersAction | {type: typeof LOGOUT};