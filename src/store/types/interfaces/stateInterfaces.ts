export interface IBasketState {
    total: number
    count: number
    order: IOrderedPizza[]
    orderStatus: {
        text: string | HTMLElement
        style: string
    }
}

export interface IOrderedPizza {
    orderedPizza: IPizza
    count: number
}

export interface IPizza {
    readonly _id: string
    ingridients: string[]
    pizzaName: string
    price: number
}

export interface IMenuState {
    menuList: IPizza[]
    currency: {
        rate: number
        symbol: string
    }
}

export interface IAuthState {
    isLogin: boolean
    loginWarning: string,
    user: IUser | {}
}

export interface IUser {
    account: {
        readonly _id: string
        name: string
        surname: string
        email: string
    }
    orders: IUserOrder[]
}

export interface IUserOrder {
    readonly _id: string
    address: string
    email: string
    total: number
    order: IOrderedPizza[]
}