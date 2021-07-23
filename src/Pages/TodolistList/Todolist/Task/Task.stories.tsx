import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import React from "react";
import {TaskPriorities, TaskStatuses} from "../../../../api/tasks-api";

export default {
    title: 'Todolist/Task Component',
    component: Task
}

const changeTaskStatusCallback = action("Status change");
const removeTaskCallback = action("Task removed");
const changeTaskTitleCallback = action("Title Change");


export const TaskBaseExample = () => {
    return <>
        <Task removeTask={removeTaskCallback}
              task={ {id: '1', title: 'HTML', status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                  priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, entityStatus: "idle"} }
              changeTaskStatus={changeTaskStatusCallback}
              // todolistId={"todolistId1"}
              changeTaskTitle={changeTaskTitleCallback}/>

        <Task removeTask={removeTaskCallback}
              task={ {id: '2', title: 'REACT', status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                  priority: TaskPriorities.Low, deadline: '', startDate: '', addedDate: '', order: 0, entityStatus: "loading"} }
              changeTaskStatus={changeTaskStatusCallback}
              // todolistId={"todolistId1"}
              changeTaskTitle={changeTaskTitleCallback}/>
    </>
}