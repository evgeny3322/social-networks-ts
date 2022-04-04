import React from 'react';
import {ActionsTypes, PostsTypeProps} from "./state";

export type ProfileReducerType = {
    posts: PostsTypeProps[]
    newPostText: string
}

let initialState: ProfileReducerType = {
    posts: [
        {id: 1, message: "Hi[1]", like: 1},
        {id: 2, message: "Hi[2]", like: 2}
    ] as Array<PostsTypeProps>,
    newPostText: ''
}


export const ProfileReducer = (state: ProfileReducerType = initialState, action: ActionsTypes): ProfileReducerType => {
    switch (action.type) {
        case 'ADD-POST':
            console.log(state.newPostText)
            let newPost: PostsTypeProps = {
                id: new Date().getTime(),
                message: state.newPostText,
                like: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state
        case 'UPDATE-NEW-POST-TEXT':
            console.log(action.newText)
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }


};


//Example 1 (native example(addText before click on textarea))

// switch(action.type) {
//     case 'ADD-POST':
//         return {...state, newPostText: '', posts: [{id: new Date().getTime(), message: state.newPostText, like: 0},...state.posts]};
//     case "UPDATE-NEW-POST-TEXT":
//         return {...state, newPostText: action.newText};
//     default:
//         return state;
// }

//Example 2 (After change function case)

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
// }

//Example 3 (Click addPost before addText)

// switch (action.type) {
//     case 'ADD-POST':
//         let newPost: PostsTypeProps = {
//             id: new Date().getTime(),
//             message: state.newPostText,
//             like: 0
//         };
//         state.posts.push(newPost);
//         state.newPostText = '';
//         return state
//     case "UPDATE-NEW-POST-TEXT":
//         state.newPostText = action.newText;
//         return state;
//     default:
//         return state;
// }