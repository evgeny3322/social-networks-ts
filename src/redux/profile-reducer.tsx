import {sendMessageActionType, updateNewMessageBodyActionType} from "./dialogs-reducer";
import {PostPropsType} from "../components/Profile/MyPosts/Post/Post";
import {UserProfileType} from "../components/Profile/ProfileContainer";
import {profileAPI, ProfileDataResponseType} from "../api/api";
import {ThunkType} from "./redux-store";


export type addPostActionType = {
    type: 'ADD-POST'
    newPostText: string
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
    type: "SET-STATUS"
    status: string
}

export type toggleIsFetchingActionType = {
    type: 'TOGGLE-IS-FETCHING'
    isFetching: boolean
}

export type DialogsProfileReducersActionsTypes = addPostActionType
    | updateNewPostTextActionType
    | updateNewMessageBodyActionType
    | sendMessageActionType
    | setUserProfileActionType
    | setStatusActionType
    | toggleIsFetchingActionType



export type ProfileReducerStateType = {
    posts: Array<PostPropsType>
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
    status: "",
    isFetching: false
}

export const profileReducer = (state: ProfileReducerStateType = initialState, action: DialogsProfileReducersActionsTypes): ProfileReducerStateType => {

    switch (action.type) {
        case 'ADD-POST':
            return {
                ...state,
                posts: [{id: new Date().getTime(), message: action.newPostText, likeCount: 0}, ...state.posts]
            };
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile};
        case "SET-STATUS":
            return {...state, status: action.status};
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
}

export const addPost = (newPostText: string): addPostActionType => ({type: 'ADD-POST', newPostText});
export const setUserProfile = (profile: UserProfileType): setUserProfileActionType => ({
    type: 'SET-USER-PROFILE',
    profile: profile
});
export const setStatus = (status: string): setStatusActionType => ({type: "SET-STATUS", status});
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: 'TOGGLE-IS-FETCHING',
    isFetching: isFetching
});

//ThunkCreator

export const getUserProfile = (userId: number | undefined): ThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        profileAPI.getProfile(userId)
            .then((data: ProfileDataResponseType) => {
                dispatch(setUserProfile(data));
                dispatch(toggleIsFetching(false));
            });
    }
}

export const getUserStatus = (userId: number | undefined): ThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        profileAPI.getStatus(userId)
            .then((response) => {
                if (response.data) {
                    dispatch(setStatus(response.data));
                } else {
                    dispatch(setStatus('Null'));
                    dispatch(toggleIsFetching(false));
                }
            });
    }
}

export const updateUserStatus = (status: string): ThunkType => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then((response) => {
                if (response.data.resultCode == 0) {
                    dispatch(setStatus(status));
                }
            });
    }
}