import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../App/store";
import {
    changerTodolistTitleTC, changeTodolistFilterAC,
    createTodolistTC,
    deleteTodolistTC, FilterType,
    getTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./Todolist/TodoList";
import {AddItemForm} from "../../Component/AddItemForm/AddItemForm";

export function TodolistList () {

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