import React, {useState} from 'react';
import "./App.css"
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";

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
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
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

    // Удаление задач
    function removeTask(taskID: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    // Фильтрация задач
    function changeFilter(value: FilterType, todoListID: string) {
        let task = todoLists.find(tl => tl.id === todoListID)
        if (task) {
            task.filter = value;
            setTodoLists([...todoLists])
        }
    }

    // Добавление задачи
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

    //Изменение задачи
    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
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
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID];
        setTasks({...tasks})
    }

    // Добавление Тудулиста
    function addTodoList(newTitle: string) {
        const newTodoListID = v1()
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: newTitle,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    // Изменение названия Тудулиста
    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let newTodoList = todoLists.find(tl => tl.id === todoListID)
        if (newTodoList) {
            newTodoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const todoList = todoLists.map(tl => {
        let todoListTasks = tasks[tl.id]
        let tasksForTodoList = todoListTasks
        if (tl.filter === 'active') {
            tasksForTodoList = todoListTasks.filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = todoListTasks.filter(t => t.isDone === true)
        }
        return (
            <Grid item>
                <Paper elevation={19} square={false} style={{padding: '10px'}}>
                    <TodoList title={tl.title}
                              key={tl.id}
                              id={tl.id}
                              filter={tl.filter}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              removeTodoList={removeTodoList}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start"
                                color="inherit"
                                aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed disableGutters={true}>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container item spacing={3} justify={"space-around"}>
                    {todoList}
                </Grid>
            </Container>
        </div>
    )
}

