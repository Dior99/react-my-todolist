import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../Component/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Component/EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../App/store";
import {
    addTaskTC,
    getTasks,
    deleteTaskTC,
    TodoListTaskType, updateTaskTC
} from "../tasks-reducer";
import {Task} from "./Task/Task";
import {FilterType, TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses} from "../../../api/tasks-api";

type TodoListPropsType = {
    todolist: TodolistDomainType
    changeFilter: (value: FilterType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
    demo?: boolean
}

export const TodoList = React.memo( ({todolist, changeFilter, removeTodoList, changeTodoListTitle, demo = false}: TodoListPropsType) => {
    //console.log('todolist')
    const dispatch = useDispatch();
    const tasks = useSelector<StateType, TodoListTaskType>(state => state.tasks)

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTasks(todolist.id))
    }, [dispatch, todolist.id])

    // Удаление задачи
    const removeTask = useCallback( (taskId: string) => {
        dispatch(deleteTaskTC(todolist.id, taskId))
    }, [dispatch])

    // Изменение чекбокса
    const changeTaskStatus = useCallback( (taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC( todolist.id, taskId, {status}))
    }, [dispatch, todolist.id])

    // Изменение задачи
    const changeTaskTitle = useCallback( (taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todolist.id, taskId, {title: newTitle}))
    }, [dispatch, todolist.id])

    // Функция кампомненты AddItemForm (добавление задач)
    const addItem = useCallback( (value: string) => {
        dispatch(addTaskTC(todolist.id, value))
    }, [dispatch, todolist.id])

    // Обработчик клика (удаление Тудулиста)
    const onClickRemoveTodoList = () => {
        removeTodoList(todolist.id)
    }

    // Обработчик кампоненты EditableSpan(изменение названия Тудулиста)
    const changeTodolistTitle = useCallback( (value: string) => {
        changeTodoListTitle(value, todolist.id)
    }, [changeTodoListTitle, todolist.id])

    // Обработчик клика (фильтрация всех задач)
    const clickFilterAllHandler = useCallback( () => {
        changeFilter('all', todolist.id)
    }, [changeFilter, todolist.id])

    // Обработчик клика (фильтрация не выполненных задач)
    const clickFilterActiveHandler = useCallback( () => {
        changeFilter('active', todolist.id)
    }, [changeFilter, todolist.id])

    // Обработчик клика (фильтрация выполненных задач)
    const clickFilterCompletedHandler = useCallback( () => {
        changeFilter('completed', todolist.id)
    }, [changeFilter, todolist.id])

    let todoListTasks = tasks[todolist.id];
    let tasksForTodoList = todoListTasks;
    if (todolist.filter === 'active') {
        tasksForTodoList = todoListTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodoList = todoListTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>
                <EditableSpan title={todolist.title}
                              disabled={todolist.entityStatus === "loading"}
                              onChange={changeTodolistTitle}/>
                <IconButton onClick={onClickRemoveTodoList} disabled={todolist.entityStatus === "loading"}>
                    <HighlightOffIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem} disabled={todolist.entityStatus === "loading"}/>
            <div>
                {
                    tasksForTodoList.map(el => {
                            return (
                                <div key={el.id}>
                                    <Task removeTask={removeTask}
                                          task={el}
                                          changeTaskStatus={changeTaskStatus}
                                          changeTaskTitle={changeTaskTitle}/>
                                </div>
                            )
                        }
                    )
                }
            </div>
            <div>
                <ButtonGroup size={'small'} fullWidth={true} style={{paddingTop: '5px'}}>
                    <Button onClick={clickFilterAllHandler}
                            variant={todolist.filter === 'all' ? "contained" : "outlined"}>All
                    </Button>
                    <Button color={'primary'} onClick={clickFilterActiveHandler}
                            variant={todolist.filter === 'active' ? "contained" : "outlined"}>Active
                    </Button>
                    <Button color={'secondary'} onClick={clickFilterCompletedHandler}
                            variant={todolist.filter === 'completed' ? "contained" : "outlined"}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

