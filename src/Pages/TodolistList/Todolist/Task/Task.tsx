import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../Component/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";

type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    task: TaskType
}
export const Task = React.memo( ({removeTask, changeTaskStatus, changeTaskTitle, task}: TaskPropsType) => {
    //console.log('Task')
    // Обработчик клика (удаление задачи)
    const onClickRemoveTask = useCallback(() => {
        removeTask(task.id)
    }, [removeTask, task.id])
    // Обработчик клика (изменение чекбокса)
    const onClickChecked = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New)
    }
    // Изменение задачи (кампонента EditableSpan)
    const onChangeTaskTitle = useCallback( (newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }, [changeTaskTitle, task.id])
    const completedTasks = {
        opacity: task.status === TaskStatuses.Completed ? "0.5" : ""
    }

    return (
        <div style={completedTasks}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      size={'small'}
                      onChange={onClickChecked}/>
            <EditableSpan title={task.title} onChange={onChangeTaskTitle}/>
            <IconButton onClick={onClickRemoveTask}>
                <Delete color={'secondary'}/>
            </IconButton>
        </div>
    )
})