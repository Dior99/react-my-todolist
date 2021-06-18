import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    id: string
    isDone: boolean
    title: string
}
export const Task = React.memo( ({removeTask, changeTaskStatus, changeTaskTitle, id, isDone, title}: TaskPropsType) => {
    //console.log('Task')
    // Обработчик клика (удаление задачи)
    const onClickRemoveTask = () => {
        removeTask(id)
    }
    // Обработчик клика (изменение чекбокса)
    const onClickChecked = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, e.currentTarget.checked)
    }
    // Изменение задачи (кампонента EditableSpan)
    const onChangeTaskTitle = useCallback( (newTitle: string) => {
        changeTaskTitle(id, newTitle)
    }, [changeTaskTitle, id])
    const completedTasks = {
        opacity: isDone ? "0.5" : ""
    }

    return (
        <div style={completedTasks}>
            <Checkbox checked={isDone}
                      size={'small'}
                      onChange={onClickChecked}/>
            <EditableSpan title={title} onChange={onChangeTaskTitle}/>
            <IconButton onClick={onClickRemoveTask}>
                <Delete color={'secondary'}/>
            </IconButton>
        </div>
    )
})