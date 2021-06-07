import React from 'react';
import "./App.css"
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./Store/store";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./Store/todolists-reducer";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TodoListTaskType = {
    [id: string]: Array<TasksType>
}


export function App() {

    const dispatch = useDispatch();
    const todolists = useSelector<StateType, TodolistType[]>(state => state.todolist)

    // Todolist:
    // Удаление Тудулиста
    function removeTodoList(todoListID: string) {
        dispatch(removeTodolistAC(todoListID))
    }

    // Добавление Тудулиста
    function addTodoList(newTitle: string) {
        dispatch(addTodolistAC(newTitle))
    }

    // Изменение названия Тудулиста
    function changeTodoListTitle(newTitle: string, todoListID: string) {
        dispatch(changeTodolistTitleAC(todoListID, newTitle))
    }

    // Фильтрация задач
    function changeFilter(value: FilterType, todoListID: string) {
        dispatch(changeTodolistFilterAC(todoListID, value))
    }

    const todoList = todolists.map(tl => {
        return (
            <Grid item>
                <Paper elevation={19} square={false} style={{padding: '10px'}}>
                    <TodoList title={tl.title}
                              key={tl.id}
                              id={tl.id}
                              filter={tl.filter}
                              changeFilter={changeFilter}
                              removeTodoList={removeTodoList}
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

