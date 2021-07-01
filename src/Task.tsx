import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./App";

type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    task: TasksType
}
export const Task = React.memo( ({removeTask, changeTaskStatus, changeTaskTitle, task}: TaskPropsType) => {
    //console.log('Task')
    // Обработчик клика (удаление задачи)
    const onClickRemoveTask = () => {
        removeTask(task.id)
    }
    // Обработчик клика (изменение чекбокса)
    const onClickChecked = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
    }
    // Изменение задачи (кампонента EditableSpan)
    const onChangeTaskTitle = useCallback( (newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }, [changeTaskTitle, task.id])
    const completedTasks = {
        opacity: task.isDone ? "0.5" : ""
    }

    return (
        <div style={completedTasks}>
            <Checkbox checked={task.isDone}
                      size={'small'}
                      onChange={onClickChecked}/>
            <EditableSpan title={task.title} onChange={onChangeTaskTitle}/>
            <IconButton onClick={onClickRemoveTask}>
                <Delete color={'secondary'}/>
            </IconButton>
        </div>
    )
})