import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ReduxStoreType, store} from "./redux/redux-store";

type AppPropsType = {
    store: ReduxStoreType
}


const App = (props: AppPropsType) => {
    const state = props.store.getState()

    return (
        <BrowserRouter>
            <div className={s.app}>
                <Header/>
                <Navbar
                    // sidebar={props.store._state.sidebar}
                />
                <div className={s.app__content}>
                    <Routes>
                        <Route path={'/dialogs/*'}
                               element={<Dialogs dialogsPage={state.dialogsPage}
                                                 dispatch={store.dispatch.bind(store)}/>}
                        />
                        <Route path={'/profile'}
                               element={<Profile profilePage={state.profilePage}
                                                 dispatch={store.dispatch.bind(store)}/>}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

