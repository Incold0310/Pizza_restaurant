import {AlertActionType} from "../types/interfaces/actionsInterfaces";
import {SHOW_ORDER_MESSAGE, CLOSE_ORDER_MESSAGE} from "../constants/constants";

export const showOrderAlert = (text: string | HTMLElement, style: string): AlertActionType => {
    return {
       type: SHOW_ORDER_MESSAGE,
       text: text,
       style: style
    }
}

export const closeOrderAlert = (): AlertActionType => {
    return {
        type: CLOSE_ORDER_MESSAGE
    }
}