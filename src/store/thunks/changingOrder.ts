import {addPizzaAction, changePizzaCountAction, deletePizzaAction} from "../actions/basket";
import {IOrderedPizza, IPizza} from "../types/interfaces/stateInterfaces";
import {DefaultThunkType} from "../../common/defaultTypes";

export const changingOrder = (operationType: string, pizza: IPizza): DefaultThunkType => {
  return (dispatch, getState) => {
    let order: IOrderedPizza[] = getState().basket.order;

    let index: number = order.findIndex((item: IOrderedPizza) => item.orderedPizza._id === pizza._id);

    if (operationType === 'new' && index == -1) return dispatch(addPizzaAction({orderedPizza: pizza, count: 1}))

    else if (operationType === 'minus' && order[index].count == 1) return;

    else if (operationType === 'delete') {
      let deletedPizzaCount: number = order[index].count;
      order = [...order.filter((item: IOrderedPizza, i: number) => i != index)]
      return dispatch(deletePizzaAction(order, pizza.price, deletedPizzaCount))
    }

    else {

      order[index] = {
        ...order[index],
        count: operationType === 'minus' ? order[index].count - 1 : order[index].count + 1
      }

      return dispatch(changePizzaCountAction(
          order,
          operationType === 'minus' ? -order[index].orderedPizza.price : order[index].orderedPizza.price,
          operationType === 'minus' ? -1 : 1
      ))
    }
  }
}
