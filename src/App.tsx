import React, {useState} from 'react';
import "./App.css"
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

type TodoListTaskType = {
    [id: string]: Array<TasksType>
}


export function App() {

    const todoListID1 = v1();
    const todoListID2 = v1();
    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoListID1, title: "What to learn", filter: 'all'},
        {id: todoListID2, title: "What to buy", filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TodoListTaskType>({
        [todoListID1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
        ],
    })

    // Удаление тасок
    function removeTask(taskID: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    // Фильтрация тасок
    function changeFilter(value: FilterType, todoListID: string) {
        let task = todoList.find( tl => tl.id === todoListID)
        if (task) {
            task.filter = value;
            setTodoList([...todoList])
        }
    }

    // Добавление тасок
    function addTask(title: string, todoListID: string) {
        let task = {
            id: v1(),
            title,
            isDone: false
        }
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    // Изменение чекбокса
    function changeTaskStatus(id: string, isDaneTask: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDaneTask;
            setTasks({...tasks})
        }
    }

    // Удаление Тудулиста
    function removeTodoList(todoListID: string) {
        setTodoList(todoList.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID];
        setTasks({...tasks})
    }




    return (
        <div className="App">
            {
                todoList.map(tl => {
                    let todoListTasks = tasks[tl.id]
                    let tasksForTodoList = todoListTasks
                    if (tl.filter === 'active') {
                        tasksForTodoList = todoListTasks.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = todoListTasks.filter(t => t.isDone === true)
                    }
                    return (
                        <TodoList title={"What to learn"}
                                  key={tl.id}
                                  id={tl.id}
                                  filter={tl.filter}
                                  tasks={tasksForTodoList}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  removeTodoList={removeTodoList}
                        />
                    )
                })
            }
        </div>
    )
}

