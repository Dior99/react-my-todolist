import React, {useCallback, useEffect} from 'react';
import "./App.css"
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./Store/store";
import {
    createTodolistTC,
    changerTodolistTitleTC,
    changeTodolistFilterAC,
    FilterType,
    getTodolistTC,
    deleteTodolistTC,
    TodolistDomainType
} from "./Store/todolists-reducer";

export function App() {

    const dispatch = useDispatch();
    const todolists = useSelector<StateType, TodolistDomainType[]>(state => state.todolist)

    useEffect(() => {
        dispatch(getTodolistTC)
    }, [dispatch])

    // Todolist:
    // Удаление Тудулиста
    const removeTodoList = useCallback( (todoListID: string) => {
        dispatch(deleteTodolistTC(todoListID))
    }, [dispatch])

    // Добавление Тудулиста
    const addTodoList = useCallback( (newTitle: string) => {
        dispatch(createTodolistTC(newTitle))
    }, [dispatch])

    // Изменение названия Тудулиста
    const changeTodoListTitle = useCallback( (newTitle: string, todoListID: string) => {
        dispatch(changerTodolistTitleTC(todoListID, newTitle))
    }, [dispatch])

    // Фильтрация задач
    const changeFilter = useCallback( (value: FilterType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, value))
    }, [dispatch])

    const todoList = todolists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper elevation={19} square={false} style={{padding: '10px'}}>
                    <TodoList title={tl.title}
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

