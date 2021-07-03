import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "399f4deb-9c8f-42dd-9e4d-88b49ab8c66a"
    }
}

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order:  number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}

export const todolistsAPI =  {
    getTodolist() {
       return instance.get<Array<TodolistType>>(`todo-lists`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}



