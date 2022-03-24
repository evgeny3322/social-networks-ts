import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {RootStateType, StoreType} from './redux/state'
import store from "./redux/state";
import {rerenderEntireTree} from "./render";


// type rerenderEntireTreePropsType = {
//     store: StoreType
// }
//
// let rerenderEntireTree = (props: rerenderEntireTreePropsType) => {
//     ReactDOM.render(
//         <App store={props.store}/>
//         ,
//         document.getElementById('root')
//     );
// }
store.subscribe(rerenderEntireTree);
rerenderEntireTree()

