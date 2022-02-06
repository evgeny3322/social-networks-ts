import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App(props: any) {

    return (
        <BrowserRouter>
            <div className={s.app}>
                <Header/>
                <Navbar
                    sidebar={props.state.sidebar}
                />
                <div className={s.app__content}>
                    <Routes>
                        <Route path="/dialogs/*"
                               element={
                                   <Dialogs
                                       dialogs={props.state.dialogsPage.dialogs}
                                       messages={props.state.dialogsPage.messages}
                                   />
                               }
                        />
                        <Route path="/profile"
                               element={
                                   <Profile
                                       posts={props.state.profilePage.posts}
                                       // dispatch={props.dispatch}
                                   />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

