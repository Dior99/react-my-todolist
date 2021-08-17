import * as todolistSelectors from "./selectors"
import {asyncAction as todolistsAction, slice} from "./todolists-reducer";
import {asyncAction as tasksAction} from "./tasks-reducer";

const todolistAction = {
    ...todolistsAction,
    ...slice.actions
}

export {
    todolistSelectors,
    tasksAction,
    todolistAction
}