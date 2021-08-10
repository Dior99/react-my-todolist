import {createTodolist, deleteTodolist, getTodolist} from "./todolists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {StateType} from "../../App/store";
import {RequestStatusType, setAppStatus} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk("tasks/getTasks",
    async (todolistId: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await tasksAPI.getTasks(todolistId)
            dispatch(setAppStatus({status: "succeeded"}))
            return {tasks: res.data.items, todolistId: todolistId}
        } catch (error) {
            handleServerNetworkError(error.messages, dispatch)
            dispatch(setAppStatus({status: "failed"}))
            return rejectWithValue(null)
        }
    })

export const deleteTask = createAsyncThunk("tasks/deleteTask",
    async (param: { todolistId: string, taskId: string }, {dispatch, rejectWithValue}) => {
        dispatch(setEntityStatusTask({todolistId: param.todolistId, taskId: param.taskId, status: "loading"}))
        dispatch(setAppStatus({status: "loading"}))
        try {
            await tasksAPI.deleteTask(param.todolistId, param.taskId)
            dispatch(setAppStatus({status: "succeeded"}))
            dispatch(setEntityStatusTask({
                todolistId: param.todolistId,
                taskId: param.taskId,
                status: "succeeded"
            }))
            return {todolistId: param.todolistId, taskId: param.taskId}
        } catch (error) {
            handleServerNetworkError(error.messages, dispatch)
            dispatch(setEntityStatusTask({
                todolistId: param.todolistId,
                taskId: param.taskId,
                status: "failed"
            }))
            return rejectWithValue(null)
        }
    })

export const createTask = createAsyncThunk("tasks/createTask",
    async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: "loading"}))
        try {
            const res = await tasksAPI.createTask(param.todolistId, param.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({status: "succeeded"}))
                return {task: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error.messages, dispatch)
            return rejectWithValue(null)
        }
    })


export const updateTask = createAsyncThunk("tasks/updateTask",
    async (param: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, {
        dispatch,
        getState, rejectWithValue
    }) => {
        const state = getState() as StateType;
        const task = state.tasks[param.todolistId].find(t => t.id === param.taskId);
        dispatch(setAppStatus({status: "loading"}))
        dispatch(setEntityStatusTask({todolistId: param.todolistId, taskId: param.taskId, status: "loading"}))

        if (task) {
            const apiModel: UpdateTaskModelType = {
                status: task.status,
                description: task.description,
                startDate: task.startDate,
                deadline: task.deadline,
                priority: task.priority,
                title: task.title,
                ...param.domainModel
            }

            const response = await tasksAPI.updateTask(param.todolistId, param.taskId, apiModel)
            try {
                if (response.data.resultCode === 0) {
                    dispatch(setAppStatus({status: "succeeded"}))
                    dispatch(setEntityStatusTask({
                        todolistId: param.todolistId,
                        taskId: param.taskId,
                        status: "succeeded"
                    }))
                    return {todolistId: param.todolistId, taskId: param.taskId, model: param.domainModel}
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(setEntityStatusTask({
                        todolistId: param.todolistId,
                        taskId: param.taskId,
                        status: "failed"
                    }))
                    return rejectWithValue(null)
                }
            } catch (error) {
                handleServerNetworkError(error.messages, dispatch)
                dispatch(setEntityStatusTask({todolistId: param.todolistId, taskId: param.taskId, status: "failed"}))
                return rejectWithValue(null)
            }
        } else {
            return rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TodoListTaskType,
    reducers: {
        setEntityStatusTask(state, action: PayloadAction<{ todolistId: string, taskId: string, status: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.status}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(getTodolist.fulfilled, (state, action) => {
            action.payload.todolist.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        });
    }
})

export const tasksReducer = slice.reducer

export const {setEntityStatusTask} = slice.actions

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