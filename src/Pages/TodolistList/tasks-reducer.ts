import {createTodolist, CreateTodolistType, deleteTodolist, DeleteTodolistType, setTodolist, SetTodolistType} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {StateType} from "../../App/store";
import {setAppStatus, RequestStatusType} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TodoListTaskType = {}

export function tasksReducer(state: TodoListTaskType = initialState, action: any): TodoListTaskType {
    switch (action.type) {
        case "DELETE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => (t.id !== action.taskId))}
        case "CREATE-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => (t.id === action.taskID ?
                    {...t, ...action.model} : t))
            }
        case "SET-TASK-ENTITY-STATUS":
                return {
                    ...state, [action.todolistId]: state[action.todolistId].map(t => (t.id === action.taskId ?
                        {...t, entityStatus: action.status} : t))
            }
        case createTodolist.type:
            return {...state, [action.payload.todolist.id]: []}
        case deleteTodolist.type: {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        case setTodolist.type: {
            const copyState = {...state}
            action.payload.todolist.forEach((tl: any) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

export const deleteTaskAC = (todolistId: string, taskId: string) =>
    ({type: "DELETE-TASK", taskId, todolistId} as const)
export const createTaskAC = (task: TaskType) =>
    ({type: "CREATE-TASK", task} as const)
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType) =>
    ({type: "UPDATE-TASK", taskID, model, todolistID} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: "SET-TASKS", tasks, todolistId} as const)
export const setEntityStatusTaskAC = (todolistId: string, taskId: string, status: RequestStatusType) =>
    ({type: "SET-TASK-ENTITY-STATUS", todolistId, taskId, status} as const)

export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(response.data.items, todolistId))
            dispatch(setAppStatus({status: "succeeded"}))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setEntityStatusTaskAC(todolistId, taskId, "loading"))
    dispatch(setAppStatus({status: "loading"}))
    tasksAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            dispatch(deleteTaskAC(todolistId, taskId))
            dispatch(setAppStatus({status: "succeeded"}))
        })
        .catch(error => {
            handleServerNetworkError(error.messages, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksAPI.createTask(todolistId, title)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(createTaskAC(response.data.data.item))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.messages, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => StateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        dispatch(setAppStatus({status: "loading"}))
        dispatch(setEntityStatusTaskAC(todolistId, taskId, "loading"))

        if (task) {
            const apiModel: UpdateTaskModelType = {
                status: task.status,
                description: task.description,
                startDate: task.startDate,
                deadline: task.deadline,
                priority: task.priority,
                title: task.title,
                ...domainModel
            }

            tasksAPI.updateTask(todolistId, taskId, apiModel)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(updateTaskAC(todolistId, taskId, domainModel))
                        dispatch(setAppStatus({status: "succeeded"}))
                        dispatch(setEntityStatusTaskAC(todolistId, taskId, "succeeded"))
                    } else {
                        handleServerAppError(response.data, dispatch)
                        dispatch(setEntityStatusTaskAC(todolistId, taskId, "failed"))
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error.messages, dispatch)
                    dispatch(setEntityStatusTaskAC(todolistId, taskId, "failed"))
                })
        }
    }

export type TodoListTaskType = {
    [key: string]: Array<TaskType>
}

type ActionType =
    ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setEntityStatusTaskAC>
    | CreateTodolistType
    | DeleteTodolistType
    | SetTodolistType
    | ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}