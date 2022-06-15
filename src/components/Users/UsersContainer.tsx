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
import {
    getCurrentPageSelector,
    getFollowingInProgressSelector,
    getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSelector
} from "../../redux/users-selectors";

type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    followUsers: (userId: number) => void,
    unFollowUsers: (userId: number) => void,
    setCurrentPage: (currentPage: number) => void,
    getUsersThunk: (currentPage: number, pageSize: number) => void
}

export type UsersContainerComponentPropsType = MapStateToPropsType & MapDispatchToPropsType


export class UsersContainerComponent extends React.Component<UsersContainerComponentPropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersThunk(currentPage, pageSize);

    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsersThunk(pageNumber, pageSize);

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
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
}


export const UsersContainer = compose<React.ComponentType>(connect(mapStateToProps,
    {
        followUsers,
        unFollowUsers,
        setCurrentPage,
        toggleFollowingInProgress,
        getUsersThunk
    }), WithAuthRedirect)(UsersContainerComponent);


