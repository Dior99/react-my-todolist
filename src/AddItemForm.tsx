import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';

type AddItemFormPropsType = {
    addItem: (value: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log('AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // Обработчик нажатия клавиши (добавления задачи)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addItem(title)
            setTitle('')
        }
        if(error !== null) {
            setError(null)
        }
    }

    // Обработчик изменения поля ввода (добавления задачи)
    const onChangeAddTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // Обработчик клика (добавления задачи)
    const onClickAddTask = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField error={!!error}
                       variant={'outlined'}
                       label='Task title'
                       value={title}
                       onKeyPress={onKeyPressAddTask}
                       helperText={error}
                       onChange={onChangeAddTask}/>
            <IconButton color={'primary'}
                        onClick={onClickAddTask}>
                <AddBoxIcon color={'primary'}/>
            </IconButton>
        </div>
    )
} )