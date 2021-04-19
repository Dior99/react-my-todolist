import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const task01 = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
        {id: 4, title: "JS", isDone: false},
    ]

    const task02 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am happy", isDone: true},
        {id: 3, title: "Yo", isDone: false},
        {id: 4, title: "Yes", isDone: false},
    ]


    return (
        <div className="App">
            <TodoList title={"Todo 01"} tasks={task01}/>
            <TodoList title={"Todo 02"} tasks={task02}/>
        </div>
    );
}

export default App;
