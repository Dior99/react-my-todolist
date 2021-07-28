import {createTodolist, deleteTodolist, setTodolist} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {StateType} from "../../App/store";
import {RequestStatusType, setAppStatus} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodoListTaskType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        deleteTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        createTask(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTask(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasks(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        setEntityStatusTask(state, action: PayloadAction<{ todolistId: string, taskId: string, status: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.status}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTodolist, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(deleteTodolist, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolist, (state, action) => {
            action.payload.todolist.forEach(tl => {
                state[tl.id] = []
            })
        });
    }
})

export const tasksReducer = slice.reducer

export const {deleteTask, createTask, updateTask, setTasks, setEntityStatusTask} = slice.actions

export const getTasks = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasks({tasks: response.data.items, todolistId: todolistId}))
            dispatch(setAppStatus({status: "succeeded"}))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setEntityStatusTask({todolistId, taskId, status: "loading"}))
    dispatch(setAppStatus({status: "loading"}))
    tasksAPI.deleteTask(todolistId, taskId)
        .then((response) => {
            dispatch(deleteTask({todolistId, taskId}))
            dispatch(setAppStatus({status: "succeeded"}))
        })
        .catch(error => {
            handleServerNetworkError(error.messages, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    tasksAPI.createTask(todolistId, title)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(createTask({task: response.data.data.item}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.messages, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => StateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        dispatch(setAppStatus({status: "loading"}))
        dispatch(setEntityStatusTask({todolistId, taskId, status: "loading"}))

        if (task) {
            const apiModel: UpdateTaskModelType = {
                status: task.status,
                description: task.description,
                startDate: task.startDate,
                deadline: task.deadline,
                priority: task.priority,
                title: task.title,
                ...domainModel
            }

            tasksAPI.updateTask(todolistId, taskId, apiModel)
                .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(updateTask({todolistId, taskId, model: domainModel}))
                        dispatch(setAppStatus({status: "succeeded"}))
                        dispatch(setEntityStatusTask({todolistId, taskId, status: "succeeded"}))
                    } else {
                        handleServerAppError(response.data, dispatch)
                        dispatch(setEntityStatusTask({todolistId, taskId, status: "failed"}))
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error.messages, dispatch)
                    dispatch(setEntityStatusTask({todolistId, taskId, status: "failed"}))
                })
        }
    }

export type TodoListTaskType = {
    [key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}