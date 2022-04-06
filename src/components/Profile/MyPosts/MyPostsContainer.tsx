import React from 'react';
import {PostPropsType} from "./Post/Post";
import {
    ActionsTypes,
    addPostCreator,
    ProfileReducerState,
    updateNewPostTextCreator
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {ReduxStoreType} from "../../../redux/redux-store";

export type MyPostsContainerPropsType = {
    store: ReduxStoreType
}

const MyPostsContainer = (props: MyPostsContainerPropsType) => {

    let state = props.store.getState();

    const addPost = () => {
        props.store.dispatch(addPostCreator())
    }

    const onPostChange = (text: string) => {
        let action =  updateNewPostTextCreator(text)
        props.store.dispatch(action)
    }

    return (
        <MyPosts
            newPostText={state.profilePage.newPostText}
            posts={state.profilePage.posts}
            updateNewPostText={onPostChange}
            addPost={addPost}
        />
    )

};

export default MyPostsContainer