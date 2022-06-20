import React from "react";
import Preloader from "./components/common/Preloader/Preloader";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {ProfileContainer, WithRouter} from "./components/Profile/ProfileContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import {AppRootStateType} from "./redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import s from "./App.module.css"

type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

export type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;

class App extends React.Component<AppPropsType> {

    componentDidMount() {

        this.props.initializeApp();
    }

    render() {

        if(!this.props.initialized) {
            debugger
            return <Preloader/>
        }

        return (
            <div className={s.app}>
                <HeaderContainer/>
                <Navbar/>
                <div>
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
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized
    }
}

export default  compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}), WithRouter)(App);

