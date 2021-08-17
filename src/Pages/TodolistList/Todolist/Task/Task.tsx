import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../Component/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";
import {useActions} from "../../../../App/store";
import {tasksAction} from "../../index";

type TaskPropsType = {
    task: TaskType
}

export const Task = React.memo( ({task}: TaskPropsType) => {
    //console.log('Task')

    const {updateTask, deleteTask} = useActions(tasksAction)

    // Удаление задачи
    const onClickRemoveTask = useCallback(() => {
        deleteTask({todolistId: task.todoListId,taskId: task.id})
    }, [task.todoListId, task.id])


    // Изменение чекбокса
    const onClickChecked = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        updateTask({taskId: task.id, todolistId: task.todoListId, domainModel: {status: newStatusValue}})
    }

    // Изменение задачи (кампонента EditableSpan)
    const onChangeTaskTitle = useCallback( (title: string) => {
        updateTask({taskId: task.id, todolistId: task.todoListId, domainModel: {title}})
    }, [task.id])

    const completedTasks = {
        opacity: task.status === TaskStatuses.Completed ? "0.5" : ""
    }

    return (
        <div style={completedTasks}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      disabled={task.entityStatus === "loading"}
                      size={'small'}
                      onChange={onClickChecked}/>
            <EditableSpan title={task.title} onChange={onChangeTaskTitle} disabled={task.entityStatus === "loading"}/>
            <IconButton onClick={onClickRemoveTask} disabled={task.entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </div>
    )
})