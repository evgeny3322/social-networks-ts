import React, {JSXElementConstructor} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

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
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number | undefined) => void
}

export type ProfileContainerComponentPropsType = MapStateToPropsType & MapDispatchToPropsType;


export class ProfileContainerComponent extends React.Component<ProfileContainerComponentPropsType> {

    componentDidMount() {

        // @ts-ignore
        let userId = Number(this.props.router.params.userId);
        if (!userId && this.props.profile) {
            userId = this.props.profile.userId;
        }
        this.props.getUserProfile(userId)
    }

    render() {

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
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

export const ProfileContainer = compose<React.ComponentType>(connect(mapStateToProps, {getUserProfile}), WithAuthRedirect, WithRouter)(ProfileContainerComponent);