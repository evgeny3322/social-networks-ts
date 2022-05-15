import React from "react";
import {AppRootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    followUsers,
    setCurrentPage,
    unFollowUsers,
    UserType, toggleFollowingInProgress, getUsersThunk,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    followUsers: (userId: number) => void,
    unFollowUsers: (userId: number) => void,
    setCurrentPage: (currentPage: number) => void,
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}

export type UsersContainerComponentPropsType = MapStateToPropsType & MapDispatchToPropsType


export class UsersContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       followUsers={this.props.followUsers}
                       unFollowUsers={this.props.unFollowUsers}
                       onPageChanged={this.onPageChanged}
                       followingInProgress={this.props.followingInProgress}
                />
            </>
        );
    }
}


const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}



export const UsersContainer = compose<React.ComponentType>(connect(mapStateToProps,
    {followUsers, unFollowUsers, setCurrentPage, toggleFollowingInProgress, getUsersThunk}), WithAuthRedirect)(UsersContainerComponent);


