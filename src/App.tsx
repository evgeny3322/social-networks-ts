import React from 'react';
import {Routes, Route} from "react-router-dom";
import s from './App.module.css';
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {LoginContainer} from "./components/Login/LoginContainer";

const App = () => {

    return (
        <div className={s.app}>
            <HeaderContainer/>
            <Navbar
                // sidebar={props.store._state.sidebar}
            />
            <div className={s.app__content}>
                <Routes>
                    <Route path={'/dialogs/*'}
                           element={<DialogsContainer/>}
                    />
                    <Route path={'/profile/:userId'}
                           element={<ProfileContainer/>}
                    />
                    <Route path={'/profile'}
                           element={<ProfileContainer/>}
                    />
                    <Route path={'/users'}
                           element={<UsersContainer/>}
                    />
                    <Route path={'/login'}
                           element={<LoginContainer/>}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;

