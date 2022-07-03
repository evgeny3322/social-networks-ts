import React from "react";
import Preloader from "./components/common/Preloader/Preloader";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {WithRouter} from "./components/Profile/ProfileContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import {AppRootStateType, store} from "./redux/redux-store";
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

// @ts-ignore
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
// @ts-ignore
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component<AppPropsType> {

    componentDidMount() {

        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className={s.app}>
                <HeaderContainer/>
                <Navbar/>
                <div>
                    <Routes>
                        <Route path={'/dialogs/*'}
                               element={() => {
                                   return <React.Suspense fallback={<Preloader/>}>
                                       <DialogsContainer/>
                                   </React.Suspense>
                               }}
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

export default compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}), WithRouter)(App);
// let AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {initializeApp}), WithRouter)(App)

// export const MainApp = () => {
//     return <BrowserRouter>
//         <Provider store={store}>
//             <AppContainer/>
//         </Provider>
//     </BrowserRouter>
// }

// export default MainApp