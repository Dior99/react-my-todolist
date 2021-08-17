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
import {setInitialized} from "./app-reducer";
import {Route} from "react-router-dom";
import {Login} from "../Pages/Login/Login";
import {logout} from "../Pages/Login/auth-reducer";
import {appSelectors} from "./index";
import {authSelectors} from "../Pages/Login";

type AppPropsType = {
    demo?: boolean
}

export function App({demo = false}: AppPropsType) {

    const dispatch = useDispatch()
    const initialized = useSelector(appSelectors.selectInitialized)
    const status = useSelector(appSelectors.selectStatus)
    const isLoginIn = useSelector(authSelectors.selectIsLoginIn)


    useEffect(() => {
        if (demo) {
            return
        }
    })

    useEffect(() => {
        dispatch(setInitialized())
    }, [])

    if(!initialized) {
        return <div style={{position: 'fixed', width: '100%', top: '50%', left: '50%'}}>
            <CircularProgress/>
        </div>
    }

    const logOutHandler = () => {
        dispatch(logout())
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



