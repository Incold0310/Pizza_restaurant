import {BasketActionType} from "../types/interfaces/actionsInterfaces";
import {ADD_PIZZA, CHANGE_PIZZA_COUNT, DELETE_PIZZA, CLEAR_BASKET} from "../constants/constants";
import {IOrderedPizza} from "../types/interfaces/stateInterfaces";

export const addPizzaAction = (newPizza: IOrderedPizza): BasketActionType => {
    return {
        type: ADD_PIZZA,
        newPizza: newPizza
    }
}

export const deletePizzaAction = (order: IOrderedPizza[], price: number, count: number): BasketActionType => {
    return {
        type: DELETE_PIZZA,
        order: order,
        price: price,
        count: count
    }
}

export const changePizzaCountAction = (order: IOrderedPizza[], price: number, count: number): BasketActionType => {
    return {
        type: CHANGE_PIZZA_COUNT,
        order: order,
        price: price,
        count: count
    }
}

export const clearBasket = (): BasketActionType => {
    return {
        type: CLEAR_BASKET
    }
}