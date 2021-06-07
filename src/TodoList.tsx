import React, {ChangeEvent} from 'react';
import {FilterType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./Store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Store/tasks-reducer";

type TodoListPropsType = {
    id: string
    title: string
    changeFilter: (value: FilterType, todoListID: string) => void
    filter: FilterType
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export function TodoList(props: TodoListPropsType) {

    const dispatch = useDispatch();
    const tasks = useSelector<StateType, Array<TasksType>>(state => state.tasks[props.id])

    // Обработчик клика (удаление Тудулиста)
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }

    // Функция кампомненты AddItemForm (добавление задач)
    const addItem = (value: string) => {
        dispatch(addTaskAC(value, props.id))
    }

    // Обработчик кампоненты EditableSpan(изменение названия Тудулиста)
    const changeTodoListTitle = (value: string) => {
        props.changeTodoListTitle(value, props.id)
    }

    // Обработчик клика (фильтрация всех задач)
    const clickFilterAllHandler = () => {
        props.changeFilter('all', props.id)
    }
    // Обработчик клика (фильтрация не выполненных задач)
    const clickFilterActiveHandler = () => {
        props.changeFilter('active', props.id)
    }
    // Обработчик клика (фильтрация выполненных задач)
    const clickFilterCompletedHandler = () => {
        props.changeFilter('completed', props.id)
    }

    let todoListTasks = tasks;
    let tasksForTodoList = todoListTasks;
    if (props.filter === 'active') {
        tasksForTodoList = todoListTasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = todoListTasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton>
                    <HighlightOffIcon color={'secondary'} onClick={onClickRemoveTodoList}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem}/>
            <div>
                {
                    tasksForTodoList.map(el => {
                            // Обработчик клика (удаление задачи)
                            const onClickRemoveTask = () => {
                                dispatch(removeTaskAC(el.id, props.id))
                            }
                            // Обработчик клика (изменение чекбокса)
                            const onClickChecked = (e: ChangeEvent<HTMLInputElement>) => {
                                let newTaskChecked = e.currentTarget.checked
                                dispatch(changeTaskStatusAC(el.id, newTaskChecked, props.id))
                            }
                            // Изменение задачи (кампонента EditableSpan)
                            const onChangeTaskTitle = (newTitle: string) => {
                                dispatch(changeTaskTitleAC(el.id, newTitle, props.id))
                            }
                            const completedTasks = {
                                opacity: el.isDone ? "0.5" : ""
                            }
                            return (
                                <div key={el.id} style={completedTasks}>
                                    <Checkbox checked={el.isDone}
                                              size={'small'}
                                              onChange={onClickChecked}/>
                                    <EditableSpan title={el.title} onChange={onChangeTaskTitle}/>
                                    <IconButton>
                                        <Delete color={'secondary'} onClick={onClickRemoveTask}/>
                                    </IconButton>
                                </div>
                            )
                        }
                    )
                }
            </div>
            <div>
                <ButtonGroup size={'small'} fullWidth={true} style={{paddingTop: '5px'}}>
                    <Button onClick={clickFilterAllHandler}
                            variant={props.filter === 'all' ? "contained" : "outlined"}>All
                    </Button>
                    <Button color={'primary'} onClick={clickFilterActiveHandler}
                            variant={props.filter === 'active' ? "contained" : "outlined"}>Active
                    </Button>
                    <Button color={'secondary'} onClick={clickFilterCompletedHandler}
                            variant={props.filter === 'completed' ? "contained" : "outlined"}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}