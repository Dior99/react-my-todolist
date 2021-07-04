import {instance, ResponseType} from "./todolists-api"

export type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type ResponseTasksType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

export const tasksAPI = {
    getTasks (todolistId: string) {
        return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask (todolistId: string, title: string) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask (todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask (todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}