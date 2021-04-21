import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterTaskType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
            {id: 1, title: "HTML", isDone: true},
            {id: 2, title: "CSS", isDone: true},
            {id: 3, title: "REACT", isDone: false},
            {id: 4, title: "JS", isDone: false},
        ])
    let [filter, setFilter] = useState<FilterTaskType>("all")

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasksForTodoList.filter( t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter( t => t.isDone === true)
    }


    function removeTask(idTask: number) {
        tasks = tasks.filter( t => t.id != idTask)
        setTasks(tasks)
    }
    function filteredTasks (value: FilterTaskType) {
        setFilter(value)
    }


    return (
        <div className="App">
            <TodoList title={"Todo 01"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}
            />
        </div>
    );
}

export default App;
