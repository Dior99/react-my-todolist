import React, {useEffect, useState} from 'react'
import {TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskModelType} from "./tasks-api";

export default {
    title: 'API/tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "1b82bf82-7b34-4df6-bfeb-8fc7c07e46ca"
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
        const todolistId = "1b82bf82-7b34-4df6-bfeb-8fc7c07e46ca"
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
        const todolistId = "1b82bf82-7b34-4df6-bfeb-8fc7c07e46ca"
        const taskId = "36aefdf4-5dda-41c6-ae05-ce28e0e86168"
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
        const todolistId = "1b82bf82-7b34-4df6-bfeb-8fc7c07e46ca"
        const taskId = "457b1c68-a8ea-481d-9257-81424a27b590"
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
