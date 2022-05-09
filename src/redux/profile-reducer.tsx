import {sendMessageActionType, updateNewMessageBodyActionType} from "./dialogs-reducer";
import {PostPropsType} from "../components/Profile/MyPosts/Post/Post";
import {UserProfileType} from "../components/Profile/ProfileContainer";
import {profileAPI, ProfileDataResponseType, usersAPI} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";


export type addPostActionType = {
    type: 'ADD-POST'
}

export type updateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}
export type setUserProfileActionType = {
    type: 'SET-USER-PROFILE'
    profile: UserProfileType
}

export type setStatusActionType = {
    type: "SET_STATUS"
    status: string
}

export type toggleIsFetchingActionType = {
    type: 'TOGGLE_IS_FETCHING'
    isFetching: boolean
}

export type ActionsTypes = addPostActionType
    | updateNewPostTextActionType
    | updateNewMessageBodyActionType
    | sendMessageActionType
    | setUserProfileActionType
    | setStatusActionType
    | toggleIsFetchingActionType

export type ProfileReducerStateType = {
    posts: Array<PostPropsType>
    newPostText: string
    profile: UserProfileType | null
    status: string
    isFetching: boolean
}

let initialState: ProfileReducerStateType = {
    posts: [
        {id: 1, message: 'MessageItem1', likeCount: 1},
        {id: 2, message: 'MessageItem2', likeCount: 2}
    ] as Array<PostPropsType>,
    profile: {
        aboutMe: 'aboutMe',
        contacts: {
            facebook: 'none',
            github: 'https://github.com',
            instagram: 'https://instagram.com/',
            mainLink: 'none',
            vk: 'none',
            twitter: 'none',
            website: 'none',
            youtube: 'none'
        },
        fullName: 'fullName',
        lookingForAJob: true,
        lookingForAJobDescription: 'lookingForAJobDescription',
        photos: {
            large: null,
            small: null
        },
        userId: 111
    },
    newPostText: '',
    status: "",
    isFetching: false
}

export const profileReducer = (state: ProfileReducerStateType = initialState, action: ActionsTypes): ProfileReducerStateType => {

    switch (action.type) {

        case 'ADD-POST':
            return {
                ...state,
                newPostText: '',
                posts: [{id: new Date().getTime(), message: state.newPostText, likeCount: 0}, ...state.posts]
            };

        case 'UPDATE-NEW-POST-TEXT':
            return {...state, newPostText: action.newText};

        case 'SET-USER-PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        case 'SET_STATUS':
            return {...state, status: action.status};

        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching};

        default:
            return state;
    }
}

export const addPostCreator = (): addPostActionType => ({type: 'ADD-POST'})

export const updateNewPostTextCreator = (text: string): updateNewPostTextActionType =>
    ({type: 'UPDATE-NEW-POST-TEXT', newText: text})

export const setUserProfile = (profile: UserProfileType): setUserProfileActionType =>
    ({type: 'SET-USER-PROFILE', profile: profile})

export const setStatus = (status: string): setStatusActionType => ({type: "SET_STATUS", status})

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching: isFetching
});

//ThunkCreator

export type DispatchProfileType = ThunkDispatch<ProfileReducerStateType, unknown, ActionsTypes>;
export type ThunkProfileType = ThunkAction<void, ProfileReducerStateType, unknown, ActionsTypes>;


export const getUserProfile = (userId: number | undefined): ThunkProfileType => {
    return (dispatch: DispatchProfileType) => {
        dispatch(toggleIsFetching(true));
        profileAPI.getProfile(userId)
            .then((data: ProfileDataResponseType) => {
                dispatch(setUserProfile(data));
                dispatch(toggleIsFetching(false));
            });
    }
}

export const getUserStatus = (userId: number | undefined): ThunkProfileType => {
    return (dispatch: DispatchProfileType) => {
        dispatch(toggleIsFetching(true));
        profileAPI.getStatus(userId)
            .then((response) => {
                if (response.data) {
                    dispatch(setStatus(response.data));
                } else {
                    dispatch(setStatus('Set status'));
                    dispatch(toggleIsFetching(false));
                }
            });
    }
}

export const updateUserStatus = (status: string): ThunkProfileType => {
    return (dispatch: DispatchProfileType) => {
        profileAPI.updateStatus(status)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            });
    }
}