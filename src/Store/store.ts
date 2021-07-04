import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer,
})

export type StateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))