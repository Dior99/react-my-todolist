import React, {useEffect, useState} from 'react'
import {TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskModelType} from "../../api/tasks-api";

export default {
    title: 'API/tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "c9922bf3-ec54-4637-b946-beaf887341ad"
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
        const todolistId = "c9922bf3-ec54-4637-b946-beaf887341ad"
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
        const todolistId = "c9922bf3-ec54-4637-b946-beaf887341ad"
        const taskId = "43126d4d-301d-4365-a418-969f1b973194"
        tasksAPI.deleteTask(taskId, todolistId)
            .then(response => {
                setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "c9922bf3-ec54-4637-b946-beaf887341ad"
        const taskId = "0df15c41-a51c-46f1-8517-832589a87ce8"
        const model: UpdateTaskModelType = {
            title: "html",
            priority: TaskPriorities.Low,
            deadline: '',
            startDate: '',
            description: '',
            status: TaskStatuses.New
        }
        tasksAPI.updateTask(todolistId, taskId, model)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
