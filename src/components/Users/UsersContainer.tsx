import React from "react";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount,
    toggleIsFetching,
    unFollow,
    UserType, toggleFollowingInProgress
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getUsers, UsersDataResponseType} from "../../api/api";

type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => void
}

export type UsersContainerComponentPropsType = MapStateToPropsType & MapDispatchToPropsType


export class UsersContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        getUsers(this.props.currentPage, this.props.pageSize)
            .then((data: UsersDataResponseType) => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        getUsers(pageNumber, this.props.pageSize)
            .then((data: UsersDataResponseType) => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            });
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       follow={this.props.follow}
                       unFollow={this.props.unFollow}
                       onPageChanged={this.onPageChanged}
                       followingInProgress={this.props.followingInProgress}
                       toggleFollowingInProgress={this.props.toggleFollowingInProgress}/>
            </>
        );
    }
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export const UsersContainer = connect(mapStateToProps,
    {
        follow,
        unFollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching,
        toggleFollowingInProgress
    })(UsersContainerComponent);