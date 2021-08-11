import {setAppStatus} from "../../App/app-reducer";
import {FieldErrorType, loginAPI, LoginDataType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const login = createAsyncThunk<undefined, LoginDataType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>("auth/login",
    async (data, {
        dispatch,
        rejectWithValue
    }) => {
        dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await loginAPI.login(data)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: "succeeded"}))
                return;
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            const error: AxiosError = err
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

export const logout = createAsyncThunk("auth/logout",
    async (data, {
        dispatch,
        rejectWithValue
    }) => {
        dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await loginAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: "succeeded"}))
                return;
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            const error: AxiosError = err
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
    })

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoginIn: false
    } as initialStateType,
    reducers: {
        setIsLoginIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoginIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoginIn = true;
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoginIn = false;
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoginIn} = slice.actions

type initialStateType = {
    isLoginIn: boolean
}