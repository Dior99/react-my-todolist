import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
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

type ActionType = RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType

export type FilterType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: TodolistDomainType[] = []

export function todolistsReducer(state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [
                {
                    id: action.todolistID,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => (tl.id === action.id ? {...tl, title: action.title} : tl))
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => (tl.id === action.id ? {...tl, filter: action.filter} : tl))
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistType => ({type: "REMOVE-TODOLIST", id})
export const addTodolistAC = (title: string): AddTodolistType => ({type: "ADD-TODOLIST", title, todolistID: v1()})
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


