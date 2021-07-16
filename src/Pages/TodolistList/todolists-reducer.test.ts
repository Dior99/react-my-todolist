import {
    createTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterType,
    deleteTodolistAC, setTodolistAC, TodolistDomainType,
    todolistsReducer, ChangeTodolistTitleType, setEntityStatusAC
} from './todolists-reducer';
import {v1} from 'uuid';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: "loading", addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, createTodolistAC({
        id: '',
        title: "new todolist",
        addedDate: '',
        order: 0,
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("new todolist");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action: ChangeTodolistTitleType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, changeTodolistTitleAC(action.id, action.title));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "completed";

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, changeTodolistFilterAC(action.id, action.filter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set the state', () => {

    const action = setTodolistAC(startState)

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});

test('status should be changed', () => {

    const action = setEntityStatusAC(todolistId2, "succeeded")

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe("succeeded");
});




