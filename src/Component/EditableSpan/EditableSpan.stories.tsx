import {action} from "@storybook/addon-actions";
import React from "react";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'Todolist/EditableSpan Component',
    component: EditableSpan
}

const changeTitleCallback = action("Change title");

export const EditableSpanBaseExample = () => {
    return <EditableSpan onChange={changeTitleCallback} title={'Hello'}/>
}