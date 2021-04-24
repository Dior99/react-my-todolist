import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterTaskType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "JS", isDone: false},
    ])
    let [filter, setFilter] = useState<FilterTaskType>("all")

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }


    function removeTask(idTask: string) {
        tasks = tasks.filter(t => t.id !== idTask)
        setTasks(tasks)
    }

    function filteredTasks(value: FilterTaskType) {
        setFilter(value)
    }

    function addTasks(title: string) {
        let task = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function checkedTask(idTask: string, isDone: boolean) {
        let task = tasks.find( t => t.id === idTask )
        if (task) {
           task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList title={"Todo 01"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}
                      addTasks={addTasks}
                      checkedTask={checkedTask}
                      filter={filter}
            />
        </div>
    );
}

export default App;
