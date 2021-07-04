import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../Store/tasks-reducer'
import {todolistsReducer} from '../../Store/todolists-reducer'
import {v1} from 'uuid'
import {StateType} from '../../Store/store'
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolist: todolistsReducer
})

const initialGlobalState: StateType = {
    todolist: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0},
            {id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0},
            {id: v1(), title: "Bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
