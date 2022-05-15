import React from "react";
import {LoginPage} from "./Login";
import {AppRootStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {AuthReducerStateType, makeLogIn, makeLogOut} from "../../redux/auth-reducer";


type LoginContainerComponentPropsType = AuthReducerStateType & {
    makeLogIn: (email: string, password: string, rememberMe: boolean) => void
    makeLogOut: () => void
}

class LoginContainerComponent extends React.Component<LoginContainerComponentPropsType> {

    render() {
        return (
            <div>
                <LoginPage {...this.props}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppRootStateType) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email,
    id: state.auth.id,
    login: state.auth.login
});

export const LoginContainer = compose(connect(mapStateToProps, {makeLogIn, makeLogOut}))(LoginContainerComponent);