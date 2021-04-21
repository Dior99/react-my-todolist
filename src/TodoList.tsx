import React from 'react';
import {FilterTaskType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: number) => void
    filteredTasks: (value: FilterTaskType) => void
}

function TodoList(props: TodoListPropsType) {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={ () => {props.removeTask(t.id)} }>x</button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button onClick={ () => {props.filteredTasks("all")}}>All</button>
                <button onClick={ () => {props.filteredTasks("active")}}>Active</button>
                <button onClick={ () => {props.filteredTasks("completed")}}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;
