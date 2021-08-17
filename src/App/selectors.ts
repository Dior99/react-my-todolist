import {StateType} from "./store";

export const selectStatus = (state: StateType) => state.app.status
export const selectInitialized = (state: StateType) => state.app.initialized