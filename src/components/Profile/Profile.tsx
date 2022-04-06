import s from "./Profile.module.css";
import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ReduxStoreType} from "../../redux/redux-store";



function Profile() {

    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;
