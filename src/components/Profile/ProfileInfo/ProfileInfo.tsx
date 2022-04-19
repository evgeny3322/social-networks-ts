import React from 'react';
import s from "./ProfileInfo.module.css";
import {UserProfileType} from "../ProfileContainer";
import Preloader from "../../common/Preloader/Preloader";
import PhotoUser from "../../../assets/img/3135715.png"

type ProfileInfoPropsType = {
    profile: UserProfileType | null
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    if (!props.profile) {
        return <>
            <Preloader/>
        </>
    }

    return (
        <div className={s.profileinfo}>

            {/*<div className={s.profileinfo__photo}>*/}
            {/*    <img src={PhotoUser} alt="#"/>*/}
            {/*</div>*/}

            <div>
                <div className={s.profileinfo__photo}>
                    <img className={s.profileinfo__img}
                         src={props.profile.photos.large !== null
                             ? props.profile.photos.large
                             : PhotoUser}
                         alt='#'/>
                </div>
                <div>{props.profile.fullName}</div>
                <div>{props.profile.aboutMe}</div>
                <div>{props.profile.lookingForAJobDescription}</div>
                <div>My contacts</div>
                <div>github: {props.profile.contacts.github}</div>
                <div>instagram: {props.profile.contacts.instagram}</div>
                <div>youtube: {props.profile.contacts.youtube}</div>
                <div>vk: {props.profile.contacts.vk}</div>
            </div>
        </div>
    );
};

export default ProfileInfo;