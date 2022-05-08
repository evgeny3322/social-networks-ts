import React, {JSXElementConstructor} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Preloader from "../common/Preloader/Preloader";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";


export type UserProfileType = {
    aboutMe: string | null,
    contacts: {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        instagram: string | null,
        youtube: string | null,
        github: string | null,
        mainLink: string | null
    }
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string,
    userId: number,
    photos: {
        small: string | null,
        large: string | null
    }
}

type MapStateToPropsType = {
    profile: UserProfileType | null
    status: string
    isFetching: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number | undefined) => void
    getUserStatus: (userId: (number | undefined)) => void
    updateUserStatus: (status: string) => void
}

export type ProfileContainerComponentPropsType = MapStateToPropsType & MapDispatchToPropsType;


export class ProfileContainerComponent extends React.Component<ProfileContainerComponentPropsType> {

    componentDidMount() {

        // @ts-ignore
        let userId = Number(this.props.router.params.userId);
        if (!userId && this.props.profile) {
            userId = 23013;
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {

        return (
            <div>
                {this.props.isFetching ? <Preloader/> : null}
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUserStatus={this.props.updateUserStatus}
                />
            </div>
        );
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isFetching: state.profilePage.isFetching
    }
}

export const WithRouter = (Component: JSXElementConstructor<any>): JSXElementConstructor<any> => {
    function WithRouterPropComponent(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return WithRouterPropComponent;
}

// для выполнения всё тех же задач использовал ф-цию compose из redux;

export const ProfileContainer = compose<React.ComponentType>(connect(mapStateToProps,
    {getUserProfile, getUserStatus, updateUserStatus}), WithAuthRedirect, WithRouter)(ProfileContainerComponent);