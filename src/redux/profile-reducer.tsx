import {sendMessageActionType, updateNewMessageBodyActionType} from "./dialogs-reducer";
import {PostPropsType} from "../components/Profile/MyPosts/Post/Post";

export type addPostActionType = {
    type: 'ADD-POST'
}

export type updateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type ActionsTypes = addPostActionType
    | updateNewPostTextActionType
    | updateNewMessageBodyActionType
    | sendMessageActionType


export type ProfileReducerStateType = {
    posts: Array<PostPropsType>
    newPostText: string
}

let initialState = {
    posts: [
        {id: 1, message: 'MessageItem1', likeCount: 1},
        {id: 2, message: 'MessageItem2', likeCount: 2}
    ],
    newPostText: ''
}

export const profileReducer = (state: ProfileReducerStateType = initialState, action: ActionsTypes) => {

    switch(action.type) {
        case 'ADD-POST':
            let newPost = {id: new Date().getTime(), message: state.newPostText, likeCount: 0};
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostCreator = () :addPostActionType => ({type: 'ADD-POST'})

export const updateNewPostTextCreator = (text:string) :updateNewPostTextActionType =>
    ({type: 'UPDATE-NEW-POST-TEXT', newText: text})