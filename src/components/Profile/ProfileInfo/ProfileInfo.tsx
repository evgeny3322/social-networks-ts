import React from 'react';
import s from "./ProfileInfo.module.css";

function ProfileInfo() {
    return (
        <div className={s.profileinfo}>
            <div className={s.profileinfo__photo}>
                <img className={s.profileinfo__img} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=""/>
            </div>

            <div>
                ava+desrc
            </div>
        </div>
    );
};

export default ProfileInfo;