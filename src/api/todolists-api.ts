import axios from "axios";

export const todolistsAPI =  {
    getTodolist() {
       return instance.get<Array<TodolistType>>(`/todo-lists`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists`, {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "de2d7fd1-a2fc-4e66-9075-a63ed9254ecb"
    }
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order:  number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}