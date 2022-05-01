import {ActionsTypes} from "./profile-reducer";
import {usersAPI, UsersDataResponseType} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export type UserType = {
    id: number
    photos: {
        small: string | null,
        large: string | null
    }
    followed: boolean
    name: string
    status: string | null
    uniqueUrlName: string | null
}

export type followActionType = {
    type: 'FOLLOW'
    userId: number
}

export type unFollowActionType = {
    type: 'UNFOLLOW'
    userId: number
}

export type setUsersActionType = {
    type: 'SET_USERS'
    users: Array<UserType>
}

export type setCurrentPageActionType = {
    type: 'SET_CURRENT_PAGE'
    currentPage: number
}

export type setTotalUsersCountActionType = {
    type: 'SET_TOTAL_USERS_COUNT'
    totalUsersCount: number
}

export type toggleIsFetchingActionType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}

export type toggleFollowingInProgressActionType = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS'
    followingInProgress: boolean
    userId: number
}

export type UsersActionsTypes = followActionType
    | unFollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalUsersCountActionType
    | toggleIsFetchingActionType
    | toggleFollowingInProgressActionType

export type UsersReducerStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

let initialState: UsersReducerStateType = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

export const usersReducer = (state: UsersReducerStateType = initialState, action: ActionsTypes): UsersReducerStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)};
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)};
        case 'SET_USERS':
            return {...state, users: [...action.users]};
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage};
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount};
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

export const follow = (userId: number): followActionType => ({type: 'FOLLOW', userId: userId});
export const unFollow = (userId: number): unFollowActionType => ({type: 'UNFOLLOW', userId: userId});
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: 'SET_USERS', users: users})
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({
    type: 'SET_CURRENT_PAGE',
    currentPage: currentPage
})
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount: totalUsersCount
})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching: isFetching
})
export const toggleFollowingInProgress = (followingInProgress: boolean, userId: number): toggleFollowingInProgressActionType => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    followingInProgress: followingInProgress,
    userId: userId
});


// Redux-thunk
export type DispatchUsersType = ThunkDispatch<UsersReducerStateType, unknown, UsersActionsTypes>;
export type ThunkUsersType = ThunkAction<void, UsersReducerStateType, unknown, UsersActionsTypes>;

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkUsersType => {
    return (dispatch: DispatchUsersType ) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize)
            .then((data: UsersDataResponseType) => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            });
    }
}

export const followUsers = (userId: number): ThunkUsersType => {
    return (dispatch: DispatchUsersType ) => {
        dispatch(toggleFollowingInProgress(true, userId));
        usersAPI.follow(userId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(follow(userId));
                }
                dispatch(toggleFollowingInProgress(false, userId));
            });
    }
}

export const unFollowUsers = (userId: number): ThunkUsersType => {
    return (dispatch: DispatchUsersType ) => {
        dispatch(toggleFollowingInProgress(true, userId));
        usersAPI.unFollow(userId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(unFollow(userId));
                }
                dispatch(toggleFollowingInProgress(false, userId));
            });
    }
}

