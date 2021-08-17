import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../Component/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../Component/EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useSelector} from "react-redux";
import {Task} from "./Task/Task";
import {TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses} from "../../../api/tasks-api";
import {tasksAction, todolistAction, todolistSelectors} from "../index";
import {useActions} from "../../../App/store";

type TodoListPropsType = {
    todolist: TodolistDomainType
    demo?: boolean
}

export const TodoList = React.memo( ({todolist, demo = false}: TodoListPropsType) => {
    //console.log('todolist')
    const tasks = useSelector(todolistSelectors.tasks)
    const {getTasks, createTask} = useActions(tasksAction)
    const {deleteTodolist, changeTodolistTitle, changeTodolistFilter} = useActions(todolistAction)

    useEffect(() => {
        if (demo) {
            return
        }
        getTasks(todolist.id)
    }, [todolist.id])

    // Функция кампомненты AddItemForm (добавление задач)
    const addItem = useCallback( (value: string) => {
        createTask({todolistId: todolist.id, title: value})
    }, [todolist.id])

    // Удаление Тудулиста
    const onClickRemoveTodoList = () => {
        deleteTodolist(todolist.id)
    }

    // Обработчик кампоненты EditableSpan(изменение названия Тудулиста)
    const changeTodolist = useCallback( (value: string) => {
        changeTodolistTitle({todolistId: todolist.id, title: value})
    }, [todolist.id])

    // Фильтрация всех задач
    const clickFilterAllHandler = useCallback( () => {
        changeTodolistFilter({filter: 'all', id: todolist.id})
    }, [todolist.id])

    // Фильтрация не выполненных задач
    const clickFilterActiveHandler = useCallback( () => {
        changeTodolistFilter({filter: 'active', id: todolist.id})
    }, [todolist.id])

    // Фильтрация выполненных задач
    const clickFilterCompletedHandler = useCallback( () => {
        changeTodolistFilter({filter: 'completed', id: todolist.id})
    }, [todolist.id])

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
                              onChange={changeTodolist}/>
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
                                    <Task task={el}/>
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

