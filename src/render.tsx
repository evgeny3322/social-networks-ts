import React from 'react';
import ReactDOM from "react-dom";
import App from "./App";
import store, {StoreType} from "./redux/state";

type rerenderEntireTreeTypeProps = {
    store:StoreType
}

export const rerenderEntireTree = () => {
    ReactDOM.render(
        <App store={store}/>
        ,
        document.getElementById('root')
    );
}