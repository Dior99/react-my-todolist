import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "399f4deb-9c8f-42dd-9e4d-88b49ab8c66a"
    }
}

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
       return axios.get<Array<TodolistType>>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
    },

    createTodolist(title: string) {
        return axios.post<ResponseType<{item: TodolistType}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
    },

    deleteTodolist(todolistId: string) {
        return axios.delete<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },

    updateTodolist(todolistId: string, title: string) {
        return axios.put<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
    }
}



