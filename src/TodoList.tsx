import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterTaskType, TaskType} from "./App";
import './App.css';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: string) => void
    filteredTasks: (value: FilterTaskType) => void
    addTasks: (title: string) => void
    checkedTask: (idTask: string, isDone: boolean) => void
    filter: FilterTaskType
}

function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string>('')

    const addTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskClick = () => {
        if (title.trim() !== '') {
            props.addTasks(title)
            setTitle('')
        } else {
            setError("Title is required!")
        }
    }
    const addTasksPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addTaskClick()
        }
    }



    const clickTasksHandlerAll = () => {
        props.filteredTasks("all")
    }
    const clickTasksHandlerActive = () => {
        props.filteredTasks("active")
    }
    const clickTasksHandlerCompleted = () => {
        props.filteredTasks("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={addTaskChange}
                       onKeyPress={addTasksPress}
                       className={error ? "error-input" : ""}
                />
                <button onClick={addTaskClick}>+</button>
                <div className={error ? "error-text" : ""}>{error}</div>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTask(t.id)
                            }
                            const onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.checkedTask(t.id, e.currentTarget.checked)
                            }
                            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onCheckedHandler}
                                />
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x
                                </button>
                            </li>
                        }
                    )
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={clickTasksHandlerAll}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={clickTasksHandlerActive}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={clickTasksHandlerCompleted}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;
