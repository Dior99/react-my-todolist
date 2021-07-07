import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "de2d7fd1-a2fc-4e66-9075-a63ed9254ecb"
    }
})

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
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
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const tasksAPI = {
    getTasks (todolistId: string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`);
    },

    createTask (todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title});
    },

    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },

    updateTask (todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}