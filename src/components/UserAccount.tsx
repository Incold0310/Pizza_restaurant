import React, {useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {Thunk} from "../common/defaultTypes";
import {getOrdersThunk} from "../store/thunks/getOrders";
import {logoutAction} from "../store/actions/auth";
import {IOrderedPizza, IPizza, IUserOrder} from "../store/types/interfaces/stateInterfaces";

const connector = connect(
    (state: RootState) => ({
        account: state.auth.user.account,
        orders: state.auth.user.orders
    }),
    (dispatch: Thunk) => ({
        getOrders(id: string, email: string) {
            dispatch(getOrdersThunk(id, email))
        },
        logout() {
            dispatch(logoutAction())
        }
    })
);

function UserAccount(props: ConnectedProps<typeof connector>) {

    useEffect(() => props.getOrders(props.account._id, props.account.email), []);

    return (
        <div className="d-flex flex-fill flex-column">
            <div className="container-fluid row mt-4 mx-0 flex-fill clearfix">
                <div className="col-4 borderShadow" style={{maxHeight: '30vh'}}>
                    <div className="row">
                        <div className="col-3 d-flex align-items-center justify-content-center">
                            <i className="fa fa-user fa-5x"></i>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <div className="col-6 my-2">
                                    <input readOnly className="form-control" placeholder={props.account.name}/>
                                </div>
                                <div className="col-6 my-2">
                                    <input readOnly className="form-control" placeholder={props.account.surname}/>
                                </div>
                                <div className="col-12 my-2">
                                    <input readOnly className="form-control" placeholder={props.account.email}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 my-2">
                            <button className="btn btn-danger" onClick={props.logout}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className="col-7 mb-4 offset-1 overflow-auto borderShadow d-flex flex-fill flex-column justify-content-center">
                    {!props.orders.length && <h1 className="mt-2 text-center">You don`t have any orders</h1>}
                    {
                        props.orders.length &&
                            <table className="table table-hover" style={{maxHeight: '80vh'}}>
                                <tbody>
                                <tr>
                                    <th scope="col" className="align-top" rowSpan={2}>№</th>
                                    <th scope="col" className="align-top w-25" rowSpan={2}>Address</th>
                                    <th scope="col" className="align-top w-50" colSpan={3}>Order</th>
                                    <th scope="col" className="align-top" rowSpan={2}>Total price</th>
                                </tr>
                                <tr>
                                    <th scope="col">№</th>
                                    <th scope="col">Pizza</th>
                                    <th scope="col">Count</th>
                                </tr>
                                    {
                                        props.orders.map((item: IUserOrder, index: number) => (
                                            <tr key={item._id}>
                                                <td scope="row">{index+1}.</td>
                                                <td>{item.address}</td>
                                                <td colSpan={3}>
                                                    <table className="w-100">
                                                        <tbody>
                                                            {
                                                                item.order.map((pizza: IOrderedPizza, index: number) => (
                                                                    <tr key={pizza.orderedPizza._id}>
                                                                        <td scope="row">{index+1}.</td>
                                                                        <td className="w-50">{pizza.orderedPizza.pizzaName}</td>
                                                                        <td>{pizza.count}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td className="col-2">{item.total}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        </div>
    )
}

export default connector(UserAccount);