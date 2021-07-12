import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../Pages/TodolistList/todolists-reducer";
import {tasksReducer} from "../Pages/TodolistList/tasks-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer,
})

export type StateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))