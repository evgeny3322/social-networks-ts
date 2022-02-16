import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {RootStateType} from './redux/state'
import {addPost} from './redux/state'


type rerenderEntireTreePropsType = {
    state: RootStateType
}

export let rerenderEntireTree = (props:RootStateType) => {
    ReactDOM.render(
        <App state={state} addPost={addPost}/>
        ,
        document.getElementById('root')
    );
}

