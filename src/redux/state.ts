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

let state: RootStateType = {
    profilePage: {
        posts: [
            {id: 1, message: "Hi[1]", like: 1},
            {id: 2, message: "Hi[2]", like: 2},
            {id: 3, message: "Hi[3]", like: 3},
        ],
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
}


export const addPost = function (postMessage: string) {
    debugger
    let newPost = {
        id: 2,
        message: postMessage,
        like: 0
    };
    state.profilePage.posts.push(newPost);
}


export default state