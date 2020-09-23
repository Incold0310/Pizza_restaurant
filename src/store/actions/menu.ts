import {MenuActionType} from "../types/interfaces/actionsInterfaces";
import {CHANGE_CURRENCY, GET_MENU} from "../constants/constants";
import {IPizza} from "../types/interfaces/stateInterfaces";

export const getMenuAction = (menu: IPizza[]): MenuActionType => {
    return {
        type: GET_MENU,
        menu: menu
    }
}

export const changeCurrencyAction = (rate: number, symbol: string): MenuActionType => {
    return {
        type: CHANGE_CURRENCY,
        rate: rate,
        symbol: symbol
    }
}