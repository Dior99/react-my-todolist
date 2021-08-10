import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        deleteTodolist(state, action: PayloadAction<{id: string}>) {
            return state.filter(tl => tl.id !== action.payload.id)
        },
        createTodolist(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitle(state, action: PayloadAction<{id: string, title: string}>) {
            return state.map(tl => (tl.id === action.payload.id
                ? {...tl, title: action.payload.title} : tl))
        },
        changeTodolistFilter(state, action: PayloadAction<{id: string, filter: FilterType}>) {
            return state.map(tl => (tl.id === action.payload.id
                ? {...tl, filter: action.payload.filter} : tl))
        },
        setTodolist(state, action: PayloadAction<{todolist: Array<TodolistType>}>) {
            return action.payload.todolist.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
        setEntityStatus(state, action: PayloadAction<{status: RequestStatusType, id: string}>) {
            return state.map(tl => (tl.id === action.payload.id
                ? {...tl, entityStatus: action.payload.status} : tl))
        },
    }
})

export const todolistsReducer = slice.reducer

export const {deleteTodolist, createTodolist, changeTodolistTitle,
    changeTodolistFilter, setTodolist, setEntityStatus} = slice.actions

export const getTodolistTC = (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todolistsAPI.getTodolist()
        .then(response => {
            dispatch(setTodolist({todolist: response.data}))
            dispatch(setAppStatus({status: "succeeded"}))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setEntityStatus({status: "loading",id: todolistId}))
    dispatch(setAppStatus({status: "loading"}))
    todolistsAPI.deleteTodolist(todolistId)
        .then((response) => {
            dispatch(deleteTodolist({id: todolistId}))
            dispatch(setAppStatus({status: "succeeded"}))
        })
        .catch(error => {
            handleServerNetworkError(error.messages, dispatch)
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todolistsAPI.createTodolist(title)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(createTodolist({todolist: response.data.data.item}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error.messages, dispatch)
        })
}
export const changerTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setEntityStatus({status:  "loading", id: todolistId}))
    dispatch(setAppStatus({status: "loading"}))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(changeTodolistTitle({id: todolistId, title}))
                dispatch(setAppStatus({status: "succeeded"}))
                dispatch(setEntityStatus({status: "succeeded",id: todolistId}))
            } else {
                handleServerAppError(response.data, dispatch)
                dispatch(setEntityStatus({status: "failed", id: todolistId}))
            }
        })
        .catch(error => {
            handleServerNetworkError(error.data, dispatch)
            dispatch(setEntityStatus({status: "failed",id: todolistId}))
        })
}

export type FilterType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterType,
    entityStatus: RequestStatusType
}

export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitle>
export type SetTodolistType = ReturnType<typeof setTodolist>
