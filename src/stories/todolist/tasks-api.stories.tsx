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
        const taskId = "8e6dfba0-9c40-43c6-9e2b-0406482b44fa"
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
        tasksAPI.updateTask(todolistId, taskId, "Css")
            .then(response => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
