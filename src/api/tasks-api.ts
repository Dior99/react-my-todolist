import axios from "axios";
import {ResponseType} from "./todolists-api"

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "399f4deb-9c8f-42dd-9e4d-88b49ab8c66a"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string | null
    deadline:null
    addedDate: string
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