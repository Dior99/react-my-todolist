import {Dispatch} from "redux";
import {loginAPI} from "../api/todolists-api";
import {setIsLoginIn} from "../Pages/Login/auth-reducer";

export const initialState: initialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, initialized: action.value}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

export const setInitializedTC = () => (dispatch: Dispatch) => {
    loginAPI.me()
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoginIn(true))
            }
            dispatch(setInitializedAC(true))
        })
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type initialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}

export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>

type ActionsType = SetAppStatusAT | SetAppErrorAT | ReturnType<typeof setInitializedAC>