import s from "./Profile.module.css";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostsTypeProps, ProfilePageTypeProps} from "../../redux/state";

export type ProfilePropsType = {
    posts: Array<PostsTypeProps>
    addPost: (postMessage: string) => void
}

function Profile(props: ProfilePropsType) {

    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                addPost={props.addPost}
                // posts={props.profilePage.posts}
                // newPostText={props.profilePage.newPostText}
                // dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;
