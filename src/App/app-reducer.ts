import {loginAPI} from "../api/todolists-api";
import {setIsLoginIn} from "../Pages/Login/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const setInitialized = createAsyncThunk("auth/setInitialized",
    async (_, {dispatch}) => {
        const res = await loginAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoginIn({value: true}))
        }
    })

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        initialized: false
    } as InitialStateType,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setInitialized.fulfilled, (state) => {
            state.initialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}

export type SetAppErrorAT = ReturnType<typeof setAppError>
export type SetAppStatusAT = ReturnType<typeof setAppStatus>