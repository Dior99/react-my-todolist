import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTodolistType = {
    type: "DELETE-TODOLIST"
    id: string
}

export type AddTodolistType = {
    type: 'CREATE-TODOLIST'
    todolist: TodolistType
}

export type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}

export type SetTodolistType = {
    type: 'SET-TODOLIST'
    todolist: Array<TodolistType>
}

type ActionType = RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistType

export type FilterType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: TodolistDomainType[] = []

export function todolistsReducer(state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] {
    switch (action.type) {
        case "DELETE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "CREATE-TODOLIST": {
            return [
                {
                    ...action.todolist, filter: "all"
                }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => (tl.id === action.id ? {...tl, title: action.title} : tl))
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => (tl.id === action.id ? {...tl, filter: action.filter} : tl))
        }
        case "SET-TODOLIST": {
            return action.todolist.map(tl => ({...tl, filter: "all"}))
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string): RemoveTodolistType => ({type: "DELETE-TODOLIST", id})
export const createTodolistAC = (todolist: TodolistType): AddTodolistType => ({type: "CREATE-TODOLIST", todolist})
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
})
export const changeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterType => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
})
export const setTodolistAC = (todolist: Array<TodolistType>): SetTodolistType => ({type: "SET-TODOLIST", todolist})

export const getTodolistTC = (dispatch: Dispatch) => {
    todolistsAPI.getTodolist()
        .then(response => {
            dispatch(setTodolistAC(response.data))
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((response) => {
            dispatch(deleteTodolistAC(todolistId))
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((response) => {
            dispatch(createTodolistAC(response.data.data.item))
        })
}

export const changerTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
    .then(response => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    })
}


