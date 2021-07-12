import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {
    //console.log('EditableSpan')
    const [title, setTitle] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
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
        : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
})