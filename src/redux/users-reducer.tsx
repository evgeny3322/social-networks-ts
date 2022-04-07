import {ActionsTypes} from "./profile-reducer";

export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
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

export type UsersReducerStateType = {
    users: Array<UserType>
}


let initialState: UsersReducerStateType = {
    users: [] as Array<UserType>
};

export const usersReducer = (state: UsersReducerStateType = initialState, action: ActionsTypes): UsersReducerStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)};
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)};
        case 'SET_USERS':
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;
    }
}

export const followAC = (userId: number): followActionType => ({type: 'FOLLOW', userId: userId});
export const unFollowAC = (userId: number): unFollowActionType => ({type: 'UNFOLLOW', userId: userId});
export const setUsersAC = (users: Array<UserType>): setUsersActionType => ({type: 'SET_USERS', users: users})
