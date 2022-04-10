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
    count: number
}
export type UsersReducerStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
}


let initialState: UsersReducerStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
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
            return {...state, totalUsersCount: action.count};

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
    count: totalUsersCount
})
