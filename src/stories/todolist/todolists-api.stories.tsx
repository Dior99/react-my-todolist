import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../../api/todolists-api";

export default {
    title: 'API/todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolist()
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("REACT!")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "fdf572cd-f0d9-4168-8344-fc13c809ade5"
        todolistsAPI.deleteTodolist(todolistId)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "c9922bf3-ec54-4637-b946-beaf887341ad"
        todolistsAPI.updateTodolist(todolistId, "TypeScript")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
