export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppInitialStateType = {
    status: RequestStatusType
    error: string | null
}

export const initialState: AppInitialStateType = {
    status: 'loading' as RequestStatusType,
    error: null
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)


export type SetErrorAT = ReturnType<typeof setAppErrorAC>
export type SetStatusAT = ReturnType<typeof setAppStatusAC>


type ActionsType = SetStatusAT | SetErrorAT