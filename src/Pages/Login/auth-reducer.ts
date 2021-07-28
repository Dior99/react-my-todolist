import {setAppStatusAC} from "../../App/app-reducer";
import {Dispatch} from "redux";
import {loginAPI, LoginDataType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: initialStateType = {
    isLoginIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoginIn(state, action: PayloadAction<{value: boolean}>) {
            state.isLoginIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoginIn} = slice.actions

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    loginAPI.login(data)
        .then((response) => {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoginIn({value: true}))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.messages, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    loginAPI.logout()
        .then((response) => {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoginIn({value: false}))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.messages, dispatch)
        })
}

type initialStateType = {
    isLoginIn: boolean
}