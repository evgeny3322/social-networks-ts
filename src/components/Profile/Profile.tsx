import s from "./Profile.module.css";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes} from "../../redux/profile-reducer";
import {PostPropsType} from "./MyPosts/Post/Post";

type ProfilePropsType = {
    profilePage: {
        posts: Array<PostPropsType>,
        newPostText: string
    },
    dispatch: (action: ActionsTypes) => void
}

function Profile(props: ProfilePropsType) {

    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     dispatch={props.dispatch}
                     newPostText={props.profilePage.newPostText}
            />
        </div>
    )
}

export default Profile;
