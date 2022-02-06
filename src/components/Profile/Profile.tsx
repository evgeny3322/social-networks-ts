import s from "./Profile.module.css";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageTypeProps} from "../../redux/state";

function Profile(props: ProfilePageTypeProps) {

    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPosts
                posts={props.posts}
                // posts={props.profilePage.posts}
                // newPostText={props.profilePage.newPostText}
                // dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile;
