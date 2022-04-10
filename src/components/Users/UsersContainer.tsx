import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC, setUsersTotalCountAC,
    unFollowAC,
    UsersReducerStateType,
    UserType
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";

type MapStateToPropsType = {
    usersPage: UsersReducerStateType
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void,
    setTotalUsersCount:(totalUsersCount:number) => void,
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

export class UsersComponent extends React.Component<UsersPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber: any) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <Users
                follow={this.props.follow}
                setCurrentPage={this.props.setCurrentPage}
                setTotalUsersCount={this.props.setTotalUsersCount}
                setUsers={this.props.setUsers}
                unFollow={this.props.unFollow}
                onPageChanged={this.onPageChanged}
                usersPage={this.props.usersPage}/>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unFollow: (userId: number) => {
            dispatch(unFollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setUsersTotalCountAC(totalUsersCount))
        },
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersComponent);