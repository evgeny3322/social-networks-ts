import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state, {RootStateType, updateNewPostText} from './redux/state'
import {addPost} from './redux/state'


type rerenderEntireTreePropsType = {
    state: RootStateType
    newPostText:string
    updateNewPostText: (newText: string) => void
}

export let rerenderEntireTree = (props:RootStateType) => {
    ReactDOM.render(
        <App state={state} addPost={addPost} newPostText={props.profilePage.newPostText} updateNewPostText={updateNewPostText}/>
        ,
        document.getElementById('root')
    );
}

