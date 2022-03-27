import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {DialogsType, StoreType} from "./redux/state";

type AppPropsType = {
    store: StoreType
}

const App: React.FC<AppPropsType> = (props) => {

    return (
        <BrowserRouter>
            <div className={s.app}>
                <Header/>
                <Navbar
                    sidebar={props.store._state.sidebar}
                />
                <div className={s.app__content}>
                    <Routes>
                        <Route path="/dialogs/*"
                               element={
                                   <Dialogs store={props.store} dispatch={props.store.dispatch.bind(props.store)} />
                               }
                        />
                        <Route path="/profile"
                               element={
                                   <Profile
                                       posts={props.store._state.profilePage.posts}
                                       // addPost={props.store.addPost.bind(props.store)}
                                       newPostText={props.store._state.profilePage.newPostText}
                                       updateNewPostText={props.store.updateNewPostText.bind(props.store)}
                                       dispatch={props.store.dispatch.bind(props.store)}
                                   />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

