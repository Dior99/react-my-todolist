import React, {MouseEvent} from 'react';
import {FilterType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (TaskID: string, todoListID: string) => void
    changeFilter: (value: FilterType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDaneTask: boolean, todoListID: string) => void
    filter: FilterType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export function TodoList(props: TodoListPropsType) {

    // Обработчик клика (удаление Тудулиста)
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.id)
    }

    // Функция кампомненты AddItemForm (добавление задач)
    const addItem = (value: string) => {
        props.addTask(value, props.id)
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

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={onClickRemoveTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addItem}/>
            <ul>
                {
                    props.tasks.map(el => {
                            // Обработчик клика (удаление задачи)
                            const onClickRemoveTask = () => {
                                props.removeTask(el.id, props.id)
                            }
                            // Обработчик клика (изменение чекбокса)
                            const onClickChecked = (e: MouseEvent<HTMLInputElement>) => {
                                let newTaskChecked = e.currentTarget.checked
                                props.changeTaskStatus(el.id, newTaskChecked, props.id)
                            }
                            // Изменение задачи (кампонента EditableSpan)
                            const onChangeTaskTitle = (newTitle: string) => {
                                props.changeTaskTitle(el.id, newTitle, props.id)
                            }
                            const completedTasks = el.isDone ? "is-done" : "";
                            return (
                                <li key={el.id} className={completedTasks}>
                                    <input type="checkbox"
                                           checked={el.isDone}
                                           onClick={onClickChecked}/>
                                    <EditableSpan title={el.title} onChange={onChangeTaskTitle}/>
                                    <button onClick={onClickRemoveTask}>X</button>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={clickFilterAllHandler}
                        className={props.filter === 'all' ? "active-filter" : ""}>All
                </button>
                <button onClick={clickFilterActiveHandler}
                        className={props.filter === 'active' ? "active-filter" : ""}>Active
                </button>
                <button onClick={clickFilterCompletedHandler}
                        className={props.filter === 'completed' ? "active-filter" : ""}>Completed
                </button>
            </div>
        </div>
    )
}