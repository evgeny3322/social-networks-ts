import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {RootStateType, StoreType} from './redux/state'
import {store} from "./redux/state";


export const rerenderEntireTree = () => {
    ReactDOM.render(
         <App store={store}/>,
        document.getElementById('root')
    )
}
store.subscribe(rerenderEntireTree);
rerenderEntireTree()

