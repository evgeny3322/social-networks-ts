import React from 'react';
import s from "./DialogsItem.module.css";
import {NavLink} from "react-router-dom";

export type DialogItemPropsType = {
    id: number,
    name: string
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let path = "/dialogs/" + props.id;

    return <div className={s.dialogs__item}>
        <NavLink to={path} className={dialogsLink => dialogsLink.isActive ? s.activeLink : s.dialogs__item}>
            {props.name}
        </NavLink>
    </div>
};

export default DialogItem;


