import {TodoListTaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType, todoListID1, todoListID2} from "./todolists-reducer";

type RemoveTaskType = {
    type: "REMOVE-TASK"
    taskID: string
    todolistID: string
}

type AddTaskType = {
    type: "ADD-TASK"
    title: string
    todolistID: string
}

type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    isDone: boolean
    todolistID: string
}

type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    title: string
    todolistID: string
}

type ActionType = RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType
    | RemoveTodolistType

const initialState: TodoListTaskType = {
    [todoListID1]: [
        {id: v1(), title: "HTML", isDone: false},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "REACT", isDone: true},
        {id: v1(), title: "JS", isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "Bread", isDone: true},
    ],
}

export function tasksReducer(state: TodoListTaskType = initialState, action: ActionType): TodoListTaskType {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID] = state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistID]: [task, ...state[action.todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => (t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t))
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => (t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t))
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskType => ({
    type: "REMOVE-TASK",
    taskID,
    todolistID
})
export const addTaskAC = (title: string, todolistID: string): AddTaskType => ({type: "ADD-TASK", title, todolistID})
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusType => ({
    type: "CHANGE-TASK-STATUS",
    taskID,
    isDone,
    todolistID
})
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleType => ({
    type: "CHANGE-TASK-TITLE",
    taskID,
    title,
    todolistID
})

