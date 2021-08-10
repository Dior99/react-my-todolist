import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {RequestStatusType, setAppStatus} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const getTodolist = createAsyncThunk("todolists/getTodolist",
    async (param, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await todolistsAPI.getTodolist()
            dispatch(setAppStatus({status: "succeeded"}))
            return {todolist: res.data}
        } catch (error) {
            handleServerNetworkError(error.messages, dispatch)
            dispatch(setAppStatus({status: "failed"}))
            return rejectWithValue(null)
        }
    })

export const deleteTodolist = createAsyncThunk("todolists/deleteTodolist",
    async (todolistId: string, {dispatch, rejectWithValue}) => {
        dispatch(setEntityStatus({status: "loading", id: todolistId}))
        dispatch(setAppStatus({status: "loading"}))
        try {
            await todolistsAPI.deleteTodolist(todolistId)
            dispatch(setAppStatus({status: "succeeded"}))
            dispatch(setEntityStatus({status: "succeeded", id: todolistId}))
            return {todolistId: todolistId}
        } catch (error) {
            handleServerNetworkError(error.messages, dispatch)
            dispatch(setEntityStatus({status: "failed", id: todolistId}))
            return rejectWithValue(null)
        }
    })

export const createTodolist = createAsyncThunk("todolists/createTodolist",
    async (title: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await todolistsAPI.createTodolist(title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: "succeeded"}))
                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error.messages, dispatch)
            dispatch(setAppStatus({status: "failed"}))
            return rejectWithValue(null)
        }
    })

export const changeTodolistTitle = createAsyncThunk("todolists/changerTodolistTitle",
    async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setEntityStatus({status: "loading", id: param.todolistId}))
        dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await todolistsAPI.updateTodolist(param.todolistId, param.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: "succeeded"}))
                dispatch(setEntityStatus({status: "succeeded", id: param.todolistId}))
                return {todolistId: param.todolistId, title: param.title}
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setEntityStatus({status: "failed", id: param.todolistId}))
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error.data, dispatch)
            dispatch(setEntityStatus({status: "failed", id: param.todolistId}))
            return rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterType }>) {
            return state.map(tl => (tl.id === action.payload.id
                ? {...tl, filter: action.payload.filter} : tl))
        },
        setEntityStatus(state, action: PayloadAction<{ status: RequestStatusType, id: string }>) {
            return state.map(tl => (tl.id === action.payload.id
                ? {...tl, entityStatus: action.payload.status} : tl))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTodolist.fulfilled, (state, action) => {
            return action.payload.todolist.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        });
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        });
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        });
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            return state.map(tl => (tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.title} : tl))
        });
    }
})

export const todolistsReducer = slice.reducer

export const {
    changeTodolistFilter, setEntityStatus
} = slice.actions

export type FilterType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterType,
    entityStatus: RequestStatusType
}
