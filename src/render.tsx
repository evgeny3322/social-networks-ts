import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import {store} from "./redux/redux-store";

export let rerenderEntireTree = () => {
    ReactDOM.render(
        <App store={store}
        />,
        document.getElementById('root')
    );
}