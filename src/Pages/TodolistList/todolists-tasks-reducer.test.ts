import {createTodolist, getTodolist, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TodoListTaskType} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TodoListTaskType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = createTodolist.fulfilled({
        todolist: {
            id: '',
            title: "new todolist",
            addedDate: '',
            order: 0,
        }
    }, "requestId", "new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});

test("empty arrays should be added when  we set todolists", () => {
    const action = getTodolist.fulfilled({
        todolist: [
            {id: "1", title: "What to learn", addedDate: '', order: 0},
            {id: "2", title: "What to buy", addedDate: '', order: 0}
        ]

    }, "requestId")

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})
