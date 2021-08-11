import {appReducer, InitialStateType, RequestStatusType, setAppError} from "./app-reducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        status: 'loading' as RequestStatusType,
        error: "Error",
        initialized: false
    }
})

test('the error should fix', () => {
    const endState = appReducer(startState, setAppError({error: "new Error!"}))

    expect(endState.error).toBe("new Error!")
});





