import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(({title, onChange, disabled = false}: EditableSpanPropsType) => {
    //console.log('EditableSpan')
    const [value, setValue] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => {
        !disabled && setEditMode(true)
    }

    const activeViewMode = () => {
        setEditMode(false)
        onChange(value)
    }

    const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField value={value}
                         onBlur={activeViewMode}
                         onChange={changeTaskTitle}
                         autoFocus/>
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})