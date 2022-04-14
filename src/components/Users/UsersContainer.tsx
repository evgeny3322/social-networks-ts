import React from "react";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    follow,
    setCurrentPage,
    setUsers,
    setTotalUsersCount,
    toggleIsFetching,
    unFollow,
    UserType
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    toggleIsFetching: (isFetching: boolean) => void
}

export type UsersContainerComponentPropsType = MapStateToPropsType & MapDispatchToPropsType


export class UsersContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {

        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {

        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
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
                />
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
        isFetching: state.usersPage.isFetching
    }
}


export const UsersContainer = connect(mapStateToProps,
    {follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainerComponent);