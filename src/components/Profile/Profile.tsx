import s from "./Profile.module.css";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostsTypeProps, ProfilePageTypeProps} from "../../redux/state";

export type ProfilePropsType = {
    posts: Array<PostsTypeProps>
    addPost: () => void
    newPostText:string
    updateNewPostText: (newText: string) => void

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
                // dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;
