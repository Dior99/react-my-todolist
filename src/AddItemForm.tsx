import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (value: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    // Обработчик нажатия клавиши (добавления задачи)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addItem(title)
            setTitle('')
        }
        setError('')
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
            setError("Title is required!")
        }
    }

    return (
        <div>
            <input className={error ? "error-input" : ""}
                   value={title}
                   onKeyPress={onKeyPressAddTask}
                   onChange={onChangeAddTask}/>
            <button onClick={onClickAddTask}>+</button>
            <div className={error ? "error-text" : ""}>{error}</div>
        </div>
    )
}