import {setAppError, setAppStatus, SetAppErrorAT, SetAppStatusAT} from "../App/app-reducer";
import {ResponseType} from "../api/tasks-api";
import {Dispatch} from "redux";

type DispatchType = SetAppErrorAT | SetAppStatusAT

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<DispatchType>) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: "Some error occurred"}))
    }
    dispatch(setAppStatus({status: "failed"}))
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch<DispatchType>) => {
    dispatch(setAppError({error: "No connection!"}))
    dispatch(setAppStatus({status: "failed"}))
}
