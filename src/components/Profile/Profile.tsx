import s from "./Profile.module.css";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";

function Profile() {
    return (
        <div className={s.profile}>
            <div className={s.profile__photo}>
                <img className={s.profile__img} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=""/>
            </div>
            
            <div>
                ava+desrc
            </div>

            <MyPosts/>
        </div>
    )
}

export default Profile;
