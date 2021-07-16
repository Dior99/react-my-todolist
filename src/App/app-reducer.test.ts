import {appReducer, InitialStateType, RequestStatusType, setAppErrorAC} from "./app-reducer";

let startState: InitialStateType
beforeEach(() => {
    startState = {
        status: 'loading' as RequestStatusType,
        error: "Error"
    }
})

test('the error should fix', () => {
    const endState = appReducer(startState, setAppErrorAC("new Error!"))

    expect(endState.error).toBe("new Error!")
});






