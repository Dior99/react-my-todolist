import {action} from "@storybook/addon-actions";
import {Task} from "../../Task";
import React from "react";

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
              task={ {id: '1', title: 'HTML', isDone: true} }
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>

        <Task removeTask={removeTaskCallback}
              task={ {id: '2', title: 'REACT', isDone: false} }
              changeTaskStatus={changeTaskStatusCallback}
              changeTaskTitle={changeTaskTitleCallback}/>
    </>
}