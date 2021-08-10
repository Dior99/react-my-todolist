import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../App/store";
import {
    changeTodolistTitle, changeTodolistFilter,
    createTodolist,
    deleteTodolist, FilterType,
    getTodolist,
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
        dispatch(getTodolist())
    }, [dispatch])

    // Todolist:
    // Удаление Тудулиста
    const removeTodoList = useCallback( (todoListID: string) => {
        dispatch(deleteTodolist(todoListID))
    }, [dispatch])

    // Добавление Тудулиста
    const addTodoList = useCallback( (newTitle: string) => {
        dispatch(createTodolist(newTitle))
    }, [dispatch])

    // Изменение названия Тудулиста
    const changeTodoListTitle = useCallback( (todolistId: string, title: string, ) => {
        dispatch(changeTodolistTitle({todolistId, title}))
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