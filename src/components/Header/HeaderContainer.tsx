import React from 'react';
import Header from "./Header";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";

type MapStateToPropsType = {
    isAuth: boolean,
    login: string
}

type MapDispatchToPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
}

type HeaderContainerComponentPropsType = MapStateToPropsType & MapDispatchToPropsType

export class HeaderContainerComponent extends React.Component<HeaderContainerComponentPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render () {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth}/>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export const HeaderContainer = connect(mapStateToProps, {setAuthUserData})(HeaderContainerComponent);