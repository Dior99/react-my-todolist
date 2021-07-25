import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../App/app-reducer";
import {Dispatch} from "redux";
import {loginAPI, LoginDataType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const initialState = {
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        default:
            return state
    }
}

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    loginAPI.login(data)
        .then((response) => {
            if(response.data.resultCode === 0) {
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.messages, dispatch)
        })
}


type ActionsType = SetAppStatusAT | SetAppErrorAT