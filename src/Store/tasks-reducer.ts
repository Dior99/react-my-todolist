import {AddTodolistType, RemoveTodolistType, SetTodolistType} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {StateType} from "./store";

type RemoveTaskType = {
    type: "DELETE-TASK"
    taskId: string
    todolistId: string
}

type AddTaskType = {
    type: "CREATE-TASK"
    task: TaskType
}

type UpdateTaskType = {
    type: "UPDATE-TASK"
    taskID: string
    model: UpdateDomainTaskModelType
    todolistID: string
}

type SetTasksType = {
    type: "SET-TASKS-TYPE"
    tasks: Array<TaskType>
    todolistId: string
}

type ActionType = RemoveTaskType
    | AddTaskType
    | UpdateTaskType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistType
    | SetTasksType

export type TodoListTaskType = {
    [key: string]: Array<TaskType>
}

const initialState: TodoListTaskType = {}

export function tasksReducer(state: TodoListTaskType = initialState, action: ActionType): TodoListTaskType {
    switch (action.type) {
        case "DELETE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => (t.id !== action.taskId))
            }
        }
        case "CREATE-TASK": {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => (t.id === action.taskID ?
                    {...t, ...action.model} : t))
            }
        }

        case "CREATE-TODOLIST": {
            return {
                ...state, [action.todolist.id]: []
            }
        }
        case "DELETE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        case "SET-TODOLIST": {
            const copyState = {...state}

            action.todolist.forEach(tl => {
                copyState[tl.id] = []
            })

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

export const deleteTaskAC = (taskId: string, todolistId: string): RemoveTaskType => ({
    type: "DELETE-TASK",
    taskId,
    todolistId
})
export const createTaskAC = (task: TaskType): AddTaskType => ({type: "CREATE-TASK", task})
export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateDomainTaskModelType): UpdateTaskType => ({
    type: "UPDATE-TASK",
    taskID,
    model,
    todolistID
})

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksType => ({
    type: "SET-TASKS-TYPE",
    tasks,
    todolistId
})

export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(response.data.items, todolistId))
        })
}

export const deleteTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(taskId, todolistId)
        .then((response) => {
            dispatch(deleteTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
     tasksAPI.createTask(todolistId, title)
        .then((response) => {
            dispatch(createTaskAC(response.data.data.item))
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => StateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);

    if(task) {
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
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            })
    }
}



