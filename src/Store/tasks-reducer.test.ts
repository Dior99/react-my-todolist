import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TodoListTaskType
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

let startState: TodoListTaskType
beforeEach( () => {
    startState = {
        "todolistId1": [
            {id: '1', title: 'HTML', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0},
            {id: '2', title: 'CSS', status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0},
            {id: '3', title: 'REACT', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0}
        ],
        "todolistId2": [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0}
        ],
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy()
});

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC("2", "New Title", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("New Title");
    expect(endState["todolistId1"][1].title).toBe("CSS");
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist", );

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});




