import {v1} from "uuid";
import {AddTodolistType, RemoveTodolistType, SetTodolistType} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";

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
    status: TaskStatuses
    todolistID: string
}

type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    title: string
    todolistID: string
}

type SetTasksType = {
    type: "SET-TASKS-TYPE"
    tasks: Array<TaskType>
    todolistId: string
}

type ActionType = RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistType
    | SetTasksType

export type TodoListTaskType = {
    [id: string]: Array<TaskType>
}

const initialState: TodoListTaskType = {}

export function tasksReducer(state: TodoListTaskType = initialState, action: ActionType): TodoListTaskType {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID] = state[action.todolistID].filter(t => t.id !== action.taskID)
            }
        }
        case "ADD-TASK": {
            let task: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistID,
                description: '',
                priority: TaskPriorities.Low,
                deadline: '',
                startDate: '',
                addedDate: '',
                order: 0
            }
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
                    status: action.status
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
        case "SET-TODOLIST": {
            const copyState = {...state}

            action.todolist.forEach(tl => {copyState[tl.id] = []})

            return copyState
        }

        case "SET-TASKS-TYPE":
            return {
                ...state, [action.todolistId]: action.tasks
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
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string): ChangeTaskStatusType => ({
    type: "CHANGE-TASK-STATUS",
    taskID,
    status,
    todolistID
})
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleType => ({
    type: "CHANGE-TASK-TITLE",
    taskID,
    title,
    todolistID
})
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksType => ({type: "SET-TASKS-TYPE", tasks, todolistId})

export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(response.data.items, todolistId))
        })
}



