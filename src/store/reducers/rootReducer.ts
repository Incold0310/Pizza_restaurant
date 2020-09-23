import {combineReducers} from 'redux';
import menuReducer from './menuReducer';
import basketReducer from './basketReducer';
import authReducer from "./authReducer";

export const rootReducer = combineReducers({
  menu: menuReducer,
  basket: basketReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>
