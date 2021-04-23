import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterTaskType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: string) => void
    filteredTasks: (value: FilterTaskType) => void
    addTasks: (title: string) => void
}

function TodoList(props: TodoListPropsType) {
    let [title, setTitle] = useState('')

    const addTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskClick = () => {
        props.addTasks(title)
        setTitle('')
    }
    const addTasksPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskClick()
        }
    }

    const ClickTasksHandlerAll = () => {
        props.filteredTasks("all")
    }
    const ClickTasksHandlerActive = () => {
        props.filteredTasks("active")
    }
    const ClickTasksHandlerCompleted = () => {
        props.filteredTasks("completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={addTaskChange}
                       onKeyPress={addTasksPress}/>
                <button onClick={addTaskClick}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTask(t.id)
                            }
                            return <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x
                                </button>
                            </li>
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={ClickTasksHandlerAll}>All
                </button>
                <button onClick={ClickTasksHandlerActive}>Active
                </button>
                <button onClick={ClickTasksHandlerCompleted}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;
