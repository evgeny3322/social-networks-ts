import React from 'react';
import s from "../Sidebar.module.css";
import {FriendTypeProps} from "../../../../redux/state";


const Friend: React.FC<FriendTypeProps> = (props) => {
    return (
        <div className={s.sidebar__item}>
            <img className={s.sidebar__img}
                 src={props.img}
                 alt=""/>
            <span className={s.sidebar__name}>
                {props.name}
            </span>
        </div>
    );
};

export default Friend;