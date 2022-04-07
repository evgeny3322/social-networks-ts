import React from 'react';
import {Routes, Route} from "react-router-dom";
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";

const App = () => {

    return (
        <div className={s.app}>
            <Header/>
            <Navbar
                // sidebar={props.store._state.sidebar}
            />
            <div className={s.app__content}>
                <Routes>
                    <Route path={'/dialogs/*'}
                           element={<DialogsContainer/>}
                    />
                    <Route path={'/profile'}
                           element={<Profile/>}
                    />
                    <Route path={'/users'}
                           element={<UsersContainer/>}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;

