import React from 'react';
import {addPostCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {StoreContext} from '../../../StoreContext';


const MyPostsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState();

                    const addPost = () => {
                        store.dispatch(addPostCreator())
                    }

                    const onPostChange = (text: string) => {
                        let action = updateNewPostTextCreator(text)
                        store.dispatch(action)
                    }

                    return (
                        <MyPosts
                            newPostText={state.profilePage.newPostText}
                            posts={state.profilePage.posts}
                            updateNewPostText={onPostChange}
                            addPost={addPost}
                        />
                    )
                }
            }
        </StoreContext.Consumer>
    )
};

export default MyPostsContainer