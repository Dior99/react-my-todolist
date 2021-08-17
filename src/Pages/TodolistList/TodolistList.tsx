import {useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./Todolist/TodoList";
import {AddItemForm} from "../../Component/AddItemForm/AddItemForm";
import {Redirect} from "react-router-dom";
import {authSelectors} from "../Login";
import {todolistAction, todolistSelectors} from "./index";
import {useActions} from "../../App/store";

type TodolistListPropsType = {
    demo?: boolean
}

export function TodolistList ({demo = false}: TodolistListPropsType) {

    const todolists = useSelector(todolistSelectors.selectorTodolists)
    const isLoginIn = useSelector(authSelectors.selectIsLoginIn)
    const {getTodolist, createTodolist} = useActions(todolistAction)

    useEffect(() => {
        if(demo || !isLoginIn) {
            return
        }
        getTodolist()
    }, [])

    // Todolist:

    // Добавление Тудулиста
    const addTodoList = useCallback( (newTitle: string) => {
        createTodolist(newTitle)
    }, [])

    const todoList = todolists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper elevation={19} square={false} style={{padding: '10px'}}>
                    <TodoList demo={demo}
                              todolist={tl}
                    />
                </Paper>
            </Grid>
        )
    })

    if(!isLoginIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container item spacing={3} justify={"space-around"}>
                {todoList}
            </Grid>
        </>
    )
}