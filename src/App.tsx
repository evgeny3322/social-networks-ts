import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ReduxStoreType, store} from "./redux/redux-store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

type AppPropsType = {
    store: ReduxStoreType
}


const App = (props: AppPropsType) => {

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
                               element={<DialogsContainer store={props.store} />}
                        />
                        <Route path={'/profile'}
                               element={<Profile store={props.store}/>}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

