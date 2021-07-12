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
import {FilterType} from "../todolists-reducer";
import {TaskStatuses} from "../../../api/tasks-api";

type TodoListPropsType = {
    id: string
    title: string
    changeFilter: (value: FilterType, todoListID: string) => void
    filter: FilterType
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export const TodoList = React.memo( ({id, title, changeFilter, filter, removeTodoList, changeTodoListTitle}: TodoListPropsType) => {
    //console.log('todolist')
    const dispatch = useDispatch();
    const tasks = useSelector<StateType, TodoListTaskType>(state => state.tasks)

    useEffect(() => {
        dispatch(getTasks(id))
    }, [dispatch, id])

    // Удаление задачи
    const removeTask = useCallback( (taskId: string) => {
        dispatch(deleteTaskTC(taskId, id))
    }, [dispatch])

    // Изменение чекбокса
    const changeTaskStatus = useCallback( (taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC( id, taskId, {status}))
    }, [dispatch, id])

    // Изменение задачи
    const changeTaskTitle = useCallback( (taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(id, taskId, {title: newTitle}))
    }, [dispatch, id])

    // Функция кампомненты AddItemForm (добавление задач)
    const addItem = useCallback( (value: string) => {
        dispatch(addTaskTC(id, value))
    }, [dispatch, id])

    // Обработчик клика (удаление Тудулиста)
    const onClickRemoveTodoList = () => {
        removeTodoList(id)
    }

    // Обработчик кампоненты EditableSpan(изменение названия Тудулиста)
    const changeTodolistTitle = useCallback( (value: string) => {
        changeTodoListTitle(value, id)
    }, [changeTodoListTitle, id])

    // Обработчик клика (фильтрация всех задач)
    const clickFilterAllHandler = useCallback( () => {
        changeFilter('all', id)
    }, [changeFilter, id])

    // Обработчик клика (фильтрация не выполненных задач)
    const clickFilterActiveHandler = useCallback( () => {
        changeFilter('active', id)
    }, [changeFilter, id])

    // Обработчик клика (фильтрация выполненных задач)
    const clickFilterCompletedHandler = useCallback( () => {
        changeFilter('completed', id)
    }, [changeFilter, id])

    let todoListTasks = tasks[id];
    let tasksForTodoList = todoListTasks;
    if (filter === 'active') {
        tasksForTodoList = todoListTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodoList = todoListTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}><EditableSpan title={title} onChange={changeTodolistTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <HighlightOffIcon color={'secondary'}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem}/>
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
                            variant={filter === 'all' ? "contained" : "outlined"}>All
                    </Button>
                    <Button color={'primary'} onClick={clickFilterActiveHandler}
                            variant={filter === 'active' ? "contained" : "outlined"}>Active
                    </Button>
                    <Button color={'secondary'} onClick={clickFilterCompletedHandler}
                            variant={filter === 'completed' ? "contained" : "outlined"}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
})

