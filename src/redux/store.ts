import {MessageType} from "../components/Dialogs/Message/Message";
import {DialogItemType} from "../components/Dialogs/DialogItem/DialogItem";
import {ActionsTypes, profileReducer} from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import {PostPropsType} from "../components/Profile/MyPosts/Post/Post";

export type StateType = {
    profilePage: {
        posts: Array<PostPropsType>
        newPostText: string
    },
    dialogsPage: {
        messages: Array<MessageType>
        newMessageBody: string
        dialogs: Array<DialogItemType>
    },
    sidebar: {
        // friends:Array<FriendTypeProps>
    }
};

export type StoreType = {
    _state: StateType
    _callSubscriber: (state:StateType) => void
    getState: () => StateType
    subscribe: (callback: () => void) => void
    dispatch: (action: ActionsTypes) => void
}

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'MessageItem1', likeCount: 1},
                {id: 2, message: 'MessageItem2', likeCount: 2}
            ],
            newPostText: ''
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'MessageItem1'},
                {id: 2, message: 'MessageItem2'},
                {id: 3, message: 'MessageItem3'},
            ],
            newMessageBody: '',
            dialogs: [
                {id: 1, name: 'PersonOne'},
                {id: 2, name: 'PersonTwo'},
                {id: 3, name: 'PersonThree'},
            ]
        },
        sidebar: {
            // friends: [
            //     {id: 1, img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", name: "name1"},
            //     {id: 2, img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", name: "name2"},
            //     {id: 3, img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", name: "name3"},
            // ],
        },
    },
    _callSubscriber(state: StateType) {
        console.log('State changed');
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state);
    }
}