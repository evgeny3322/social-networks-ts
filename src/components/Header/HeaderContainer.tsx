import React from 'react';
import Header from "./Header";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getAuthUserData, setAuthUserData} from "../../redux/auth-reducer";

type MapStateToPropsType = {
    isAuth: boolean,
    login: string
}

type MapDispatchToPropsType = {
    getAuthUserData: () => void
}

type HeaderContainerComponentPropsType = MapStateToPropsType & MapDispatchToPropsType

export class HeaderContainerComponent extends React.Component<HeaderContainerComponentPropsType> {

    componentDidMount() {

        this.props.getAuthUserData();
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

export const HeaderContainer = connect(mapStateToProps,{getAuthUserData})(HeaderContainerComponent);