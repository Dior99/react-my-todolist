import {setAppErrorAC, setAppStatusAC, SetAppErrorAT, SetAppStatusAT} from "../App/app-reducer";
import {ResponseType} from "../api/tasks-api";
import {Dispatch} from "redux";

type DispatchType = SetAppErrorAT | SetAppStatusAT

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<DispatchType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch<DispatchType>) => {
    dispatch(setAppErrorAC("No connection!"))
    dispatch(setAppStatusAC("failed"))
}
