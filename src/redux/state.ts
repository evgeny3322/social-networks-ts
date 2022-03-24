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
export type ActionsTypes = ReturnType<typeof addPostAC> | ReturnType<typeof changeNewTextAC>

export const addPostAC = (postText: string) => {
    return {
        type: "ADD-POST",
        postText: postText
    } as const
}

export const changeNewTextAC = (newText: string) => {
    return {
        type: "CHANGE-NEW-TEXT",
        newText: newText
    } as const
}


const store: StoreType = {
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
        }
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
        console.log('state')
    },
    subscribe(callback) {
        this._onChange = callback;
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        if (action.type === "ADD-POST") {
            let newPost: PostsTypeProps = {
                id: new Date().getTime(),
                message: this._state.profilePage.newPostText,
                like: 0
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._onChange();
        } else if (action.type === "CHANGE-NEW-TEXT") {
            this._state.profilePage.newPostText = action.newText;
            this._onChange();
        }
    }
}

export default store