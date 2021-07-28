import {Dispatch} from "redux";
import {loginAPI} from "../api/todolists-api";
import {setIsLoginIn} from "../Pages/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setInitialized(state, action: PayloadAction<{value: boolean}>) {
            state.initialized = action.payload.value
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setInitialized} = slice.actions

export const setInitializedTC = () => (dispatch: Dispatch) => {
    loginAPI.me()
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoginIn({value: true}))
            }
            dispatch(setInitialized({value: true}))
        })
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}

export type SetAppErrorAT = ReturnType<typeof setAppError>
export type SetAppStatusAT = ReturnType<typeof setAppStatus>