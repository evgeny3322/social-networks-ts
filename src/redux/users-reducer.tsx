import {ActionsTypes} from "./profile-reducer";

export type UserType = {
    id: number
    photos: {
        small: string
        large: string
    }
    followed: boolean
    name: string
    status: string
    location: {
        city: string
        country: string
    }
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

export type UsersReducerStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

let initialState: UsersReducerStateType = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
        default:
            return state;
    }
}

export const followAC = (userId: number): followActionType => ({type: 'FOLLOW', userId: userId});
export const unFollowAC = (userId: number): unFollowActionType => ({type: 'UNFOLLOW', userId: userId});
export const setUsersAC = (users: Array<UserType>): setUsersActionType => ({type: 'SET_USERS', users: users})
export const setCurrentPageAC = (currentPage: number): setCurrentPageActionType => ({
    type: 'SET_CURRENT_PAGE',
    currentPage: currentPage
})
export const setUsersTotalCountAC = (totalUsersCount: number): setTotalUsersCountActionType => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount: totalUsersCount
})
export const toggleIsFetchingAC = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching: isFetching
})
