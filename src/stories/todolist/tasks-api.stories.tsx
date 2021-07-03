import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../../api/tasks-api";

export default {
    title: 'API/tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "fdf572cd-f0d9-4168-8344-fc13c809ade5"
        tasksAPI.getTasks(todolistId)
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "fdf572cd-f0d9-4168-8344-fc13c809ade5"
        tasksAPI.createTask(todolistId, "HTML5")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "fdf572cd-f0d9-4168-8344-fc13c809ade5"
        const taskId = "e9bc6079-426c-4d80-9b7f-911926724717"
        tasksAPI.deleteTask(todolistId, taskId)
            .then(response => {
                setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "fdf572cd-f0d9-4168-8344-fc13c809ade5"
        const taskId = "ce0a6d6e-6e2a-47e5-8627-355161a62ccc"
        tasksAPI.updateTask(todolistId, taskId, "html")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
