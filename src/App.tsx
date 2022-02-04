import React from 'react';
import s from './App.module.css';
import Header from './components/Header/Header';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Установи react-router-app
function App() {
    return (
        <div className={s.app}>
            <Header/>
            <Navbar/>
            <div className={s.app__content}>
                <Routes>
                    <Route path="/dialogs/*"
                           element={
                               <Dialogs
                                   // messages={props.state.dialogsPage.messages}
                                   // dialogs={props.state.dialogsPage.dialogs}
                               />
                           }
                    />
                    <Route path="/profile" element={
                        <Profile
                            // profilePage={props.state.profilePage}
                            // dispatch={props.dispatch}
                        />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;


// <BrowserRouter>
//     <div className='app-wrapper'>
//         <Header/>
//         <Navbar/>
//         <div className='app-wrapper__content'>
//             <Routes>
//                 <Route path="/dialogs/*"
//                        element={
//                            <Dialogs
//                                messages={props.state.dialogsPage.messages}
//                                dialogs={props.state.dialogsPage.dialogs}
//                            />
//                        }
//                 />
//                 <Route path="/profile" element={
//                     <Profile
//                         profilePage={props.state.profilePage}
//                         dispatch={props.dispatch}
//                     />}
//                 />
//             </Routes>
//         </div>
//     </div>
// </BrowserRouter>