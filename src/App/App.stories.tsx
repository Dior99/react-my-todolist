import React from "react";
import {App} from "./App";
import {BrowserRouteDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouteDecorator]
}

export const AppBaseExample = () => {
    return <App demo={true}/>
}