import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../App/store";
import {
    changerTodolistTitleTC, changeTodolistFilter,
    createTodolistTC,
    deleteTodolistTC, FilterType,
    getTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./Todolist/TodoList";
import {AddItemForm} from "../../Component/AddItemForm/AddItemForm";
import {Redirect} from "react-router-dom";

type TodolistListPropsType = {
    demo?: boolean
}

export function TodolistList ({demo = false}: TodolistListPropsType) {

    const dispatch = useDispatch();
    const todolists = useSelector<StateType, TodolistDomainType[]>(state => state.todolist)
    const isLoginIn = useSelector<StateType, boolean>(state => state.auth.isLoginIn)

    useEffect(() => {
        if(demo || !isLoginIn) {
            return
        }
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
        dispatch(changeTodolistFilter({id: todoListID, filter: value}))
    }, [dispatch])

    const todoList = todolists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper elevation={19} square={false} style={{padding: '10px'}}>
                    <TodoList demo={demo}
                              todolist={tl}
                              changeFilter={changeFilter}
                              removeTodoList={removeTodoList}
                              changeTodoListTitle={changeTodoListTitle}
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