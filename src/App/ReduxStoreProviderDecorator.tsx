import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../Pages/TodolistList/tasks-reducer'
import {todolistsReducer} from '../Pages/TodolistList/todolists-reducer'
import {v1} from 'uuid'
import {StateType} from './store'
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer,
    app: appReducer
})

const initialGlobalState: StateType = {
    todolist: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "loading", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '',
                order: 0, entityStatus: "loading"},
            {id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '',
                order: 0, entityStatus: "idle"},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '',
                order: 0, entityStatus: "idle"},
            {id: v1(), title: "Bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '',
                order: 0, entityStatus: "loading"},
        ]
    },
    app: {
        status: "idle",
        error: null
    },
    auth: {
        isLoginIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
