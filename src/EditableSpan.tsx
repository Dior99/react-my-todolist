import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const activeEditMode = () => {
        setEditMode(true)
    }
    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
       setTitle(e.currentTarget.value)
    }

    return (
        editMode
        ? <TextField value={title}
                 onBlur={activeViewMode}
                 onChange={changeTaskTitle}
                 autoFocus/>
        : <span onDoubleClick={activeEditMode}>{title}</span>
    )
}