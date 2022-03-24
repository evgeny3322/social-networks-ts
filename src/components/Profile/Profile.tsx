import s from "./Profile.module.css";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, PostsTypeProps} from "../../redux/state";

export type ProfilePropsType = {
    posts: Array<PostsTypeProps>
    newPostText:string
    updateNewPostText: (newText: string) => void
    addPost: () => void
    dispatch: (action: ActionsTypes) => void
}

function Profile(props: ProfilePropsType) {

    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPosts
                newPostText={props.newPostText}
                posts={props.posts}
                addPost={props.addPost}
                updateNewPostText={props.updateNewPostText}
                dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;
