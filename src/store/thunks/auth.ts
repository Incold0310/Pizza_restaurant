import axios from 'axios';
import {DefaultThunkType} from "../../common/defaultTypes";
import {enviroment} from "../enviroment";
import {loginFailed, loginSuccess} from "../actions/auth";

export const authorization = (path: string, data): DefaultThunkType => {
    return dispatch => {
        axios.post(enviroment.baseUrl + path, data)
            .then(res => dispatch(loginSuccess(res.data)))
            .catch(err => dispatch(loginFailed(err.response.data)))
    }
}