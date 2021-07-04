import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./Store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, getTasks, removeTaskAC} from "./Store/tasks-reducer";
import {Task} from "./Task";
import {FilterType} from "./Store/todolists-reducer";
import {TaskStatuses, TaskType} from "./api/tasks-api";

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
    const tasks = useSelector<StateType, Array<TaskType>>(state => state.tasks[id])

    useEffect(() => {
        dispatch(getTasks(id))
    }, [id])

    // Удаление задачи
    const removeTask = useCallback( (taskId: string) => {
        dispatch(removeTaskAC(taskId, id))
    }, [dispatch, id])

    // Изменение чекбокса
    const changeTaskStatus = useCallback( (taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(taskId, status, id))
    }, [dispatch, id])

    // Изменение задачи
    const changeTaskTitle = useCallback( (taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, id))
    }, [dispatch, id])

    // Функция кампомненты AddItemForm (добавление задач)
    const addItem = useCallback( (value: string) => {
        dispatch(addTaskAC(value, id))
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

    let todoListTasks = tasks;
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

