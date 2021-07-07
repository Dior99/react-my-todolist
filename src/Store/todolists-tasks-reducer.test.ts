import {createTodolistAC, setTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TodoListTaskType} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TodoListTaskType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = createTodolistAC({
            id: '',
            title: "new todolist",
            addedDate: '',
            order: 0,
        });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

test("empty arrays should be added when  we set todolists", () => {
    const action = setTodolistAC([
        {id: "1", title: "What to learn", addedDate: '', order: 0},
        {id: "2", title: "What to buy", addedDate: '', order: 0}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})
