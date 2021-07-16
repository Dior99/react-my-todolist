import React, {useEffect} from 'react';
import "./App.css"
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {TodolistList} from '../Pages/TodolistList/TodolistList';
import {ErrorSnackbar} from "../Component/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {StateType} from "./store";
import {RequestStatusType} from "./app-reducer";

type AppPropsType = {
    demo?: boolean
}

export function App({demo = false}: AppPropsType) {

    useEffect(() => {
        if (demo) {
            return
        }
    })

    const status = useSelector<StateType, RequestStatusType>(state => state.app.status)


    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed disableGutters={true}>
                <TodolistList demo={demo}/>
            </Container>
        </div>
    )
}



