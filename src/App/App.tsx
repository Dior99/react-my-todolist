import React, {useEffect} from 'react';
import "./App.css"
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {TodolistList} from '../Pages/TodolistList/TodolistList';
import {ErrorSnackbar} from "../Component/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store";
import {RequestStatusType, setInitializedTC} from "./app-reducer";
import {Route} from "react-router-dom";
import {Login} from "../Pages/Login/Login";
import {logoutTC} from "../Pages/Login/auth-reducer";

type AppPropsType = {
    demo?: boolean
}

export function App({demo = false}: AppPropsType) {

    const dispatch = useDispatch()
    const initialized = useSelector<StateType, boolean>(state => state.app.initialized)
    const isLoginIn = useSelector<StateType, boolean>(state => state.auth.isLoginIn)
    const status = useSelector<StateType, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        if (demo) {
            return
        }
    })

    useEffect(() => {
        dispatch(setInitializedTC())
    }, [])

    if(!initialized) {
        return <div style={{position: 'fixed', width: '100%', top: '50%', left: '50%'}}>
            <CircularProgress/>
        </div>
    }

    const logOutHandler = () => {
        dispatch(logoutTC())
    }


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
                        {isLoginIn && <Button onClick={logOutHandler}
                                              variant={'outlined'}
                                              color="inherit">Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed disableGutters={true}>
                    <Route exact path={"/"} render={() => <TodolistList demo={demo}/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                </Container>
            </div>
    )
}



