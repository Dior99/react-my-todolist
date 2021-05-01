import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {FilterType, TasksType} from "./App";

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
}

export function TodoList(props: TodoListPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    // Обработчик изменения поля ввода (добавления задачи)
    const onChangeAddTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    // Обработчик клика (добавления задачи)
    const onClickAddTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError("Title is required!")
        }
    }
    // Обработчик нажатия клавиши (добавления задачи)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(title, props.id)
            setTitle('')
        }
        setError('')
    }
    // Обработчик клика (удаление Тудулиста)
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.id)
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
            <h3>{props.title}
                <button onClick={onClickRemoveTodoList}>X</button>
            </h3>
            <div>
                <input className={error ? "error-input" : ""}
                       value={title}
                       onKeyPress={onKeyPressAddTask}
                       onChange={onChangeAddTask}/>
                <button onClick={onClickAddTask}>+</button>
                <div className={error ? "error-text" : ""}>{error}</div>
            </div>
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
                            const completedTasks = el.isDone ? "is-done" : "";
                            return (
                                <li key={el.id} className={completedTasks}>
                                    <input type="checkbox"
                                           checked={el.isDone}
                                           onClick={onClickChecked}/>
                                    <span>{el.title}</span>
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