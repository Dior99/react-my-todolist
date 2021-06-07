import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

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

type ActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

export const todoListID1 = v1();
export const todoListID2 = v1();

const initialState: TodolistType[] = [
    {id: todoListID1, title: "What to learn", filter: 'all'},
    {id: todoListID2, title: "What to buy", filter: 'all'}
]

export function todolistsReducer(state: TodolistType[] = initialState, action: ActionType): TodolistType[] {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{id: action.todolistID, title: action.title, filter: 'all'}, ...state]
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


