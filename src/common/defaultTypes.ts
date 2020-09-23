import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/reducers/rootReducer";
import {Action} from "redux";

export type DefaultThunkType = ThunkAction<void, RootState, unknown, Action<string>>;

export type Thunk = ThunkDispatch<void, RootState, any>;