import {usersAPI, UsersDataResponseType} from "../api/api";
import {ThunkType} from "./redux-store";

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
    type: 'SET-USERS'
    users: Array<UserType>
}

export type setCurrentPageActionType = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}

export type setTotalUsersCountActionType = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalUsersCount: number
}

export type toggleIsFetchingActionType = {
    type: 'TOGGLE-IS-FETCHING'
    isFetching: boolean
}

export type toggleFollowingInProgressActionType = {
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS'
    followingInProgress: boolean
    userId: number
}

export type UsersReducerActionsTypes = followActionType
    | unFollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalUsersCountActionType
    | toggleIsFetchingActionType
    | toggleFollowingInProgressActionType

export type UsersReducerStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
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

export const usersReducer = (state: UsersReducerStateType = initialState, action: UsersReducerActionsTypes): UsersReducerStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)};
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)};
        case 'SET-USERS':
            return {...state, users: action.users};
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage};
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalUsersCount};
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching};
        case 'TOGGLE-IS-FOLLOWING-PROGRESS':
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
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: 'SET-USERS', users: users})
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({
    type: 'SET-CURRENT-PAGE',
    currentPage: currentPage
})
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({
    type: 'SET-TOTAL-USERS-COUNT',
    totalUsersCount: totalUsersCount
})
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: 'TOGGLE-IS-FETCHING',
    isFetching: isFetching
})
export const toggleFollowingInProgress = (followingInProgress: boolean, userId: number): toggleFollowingInProgressActionType => ({
    type: 'TOGGLE-IS-FOLLOWING-PROGRESS',
    followingInProgress: followingInProgress,
    userId: userId
});


//ThunkCreators

export const getUsersThunk = (currentPage: number, pageSize: number): ThunkType => {
    return (dispatch ) => {
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

export const followUsers = (userId: number): ThunkType => {
    return (dispatch ) => {
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

export const unFollowUsers = (userId: number): ThunkType => {
    return (dispatch ) => {
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

