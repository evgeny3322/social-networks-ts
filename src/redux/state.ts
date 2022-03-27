import {ProfileReducer} from "./profile-reducer";

export type PostsTypeProps = {
    id: number
    message: string
    like: number
}

export type MessagesTypeProps = {
    id: number
    message: string
}

export type DialogItemPropsType = {
    id: number
    name: string
}

export type ProfilePageTypeProps = {
    posts: Array<PostsTypeProps>
    newPostText: string
}

export type DialogsPadeTypeProps = {
    dialogs: Array<DialogItemPropsType>
    messages: Array<MessagesTypeProps>
}


export type DialogsType = {
    dialogs: Array<DialogItemPropsType>
    messages: Array<MessagesTypeProps>
    newMessageBody: string
}

export type FriendTypeProps = {
    id: number
    img: string
    name: string
}

export type SidebarTypeProps = {
    friends: Array<FriendTypeProps>
}

export type RootStateType = {
    profilePage: ProfilePageTypeProps
    dialogsPage: DialogsPadeTypeProps
    sidebar: SidebarTypeProps
    newMessageBody: string
}

export type StoreType = {
    _state: RootStateType
    updateNewPostText: (newText: string) => void
    addPost: () => void
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewTextAC>
    | ReturnType<typeof messageNewTextAC>
    | ReturnType<typeof sendMessageAC>

export const addPostAC = (postText: string) => {
    return {
        type: "ADD-POST",
        postText: postText
    } as const
}

export const changeNewTextAC = (text: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: text
    } as const
}

export const messageNewTextAC = (body: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body
    } as const
}

export const sendMessageAC = () => {
    return {
        type: 'SEND-MESSAGE',
    } as const
}

export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi[1]", like: 1},
                {id: 2, message: "Hi[2]", like: 2},
                {id: 3, message: "Hi[3]", like: 3},
            ],
            newPostText: '',
        },
        dialogsPage: {
            messages: [
                {id: 1, message: "Hi PersonOne"},
                {id: 2, message: "Hi PersonTwo"},
                {id: 3, message: "Hi PersonThree"},
            ],
            dialogs: [
                {id: 1, name: "PersonTwo"},
                {id: 2, name: "PersonTwo"},
                {id: 3, name: "PersonTwo"},
            ],
        },
        sidebar: {
            friends: [
                {id: 1, img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", name: "name1"},
                {id: 2, img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", name: "name2"},
                {id: 3, img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", name: "name3"},
            ],
        },
        newMessageBody: ""
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText;
        this._onChange();
    },
    addPost() {
        let newPost: PostsTypeProps = {
            id: new Date().getTime(),
            message: this._state.profilePage.newPostText,
            like: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._onChange();
    },
    _onChange() {
        // console.log('state')
        return this._state
    },
    subscribe(callback) {
        this._onChange = callback;
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        this._state.profilePage = ProfileReducer(this._state.profilePage, action)
        // this._state.dialogsPage = DialogsReducer(this._state.dialogsPage, action)

        // if (action.type === "ADD-POST") {
        //     let newPost: PostsTypeProps = {
        //         id: new Date().getTime(),
        //         message: this._state.profilePage.newPostText,
        //         like: 0
        //     };
        //     this._state.profilePage.posts.push(newPost);
        //     this._state.profilePage.newPostText = '';
        //     this._onChange();
        // } else if (action.type === "UPDATE-NEW-POST-TEXT") {
        //     this._state.profilePage.newPostText = action.newText;
        //     this._onChange();
        // } else if (action.type === "UPDATE-NEW-MESSAGE-BODY") {
        //     this._state.newMessageBody = action.body
        //     this._onChange();
        // } else if (action.type === "SEND-MESSAGE") {
        //     let body = this._state.newMessageBody
        //     this._state.newMessageBody = "";
        //     this._state.dialogsPage.messages.push({id: 6, message: body});
        //     this._onChange();
        // }
    }
}

export default store