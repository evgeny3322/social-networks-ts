import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import {DialogsPadeTypeProps} from "../../redux/state";

const Dialogs: React.FC<DialogsPadeTypeProps> = (props) => {

    let dialogsElement = props.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)

    let messagesElement = props.messages.map((m) => <Message message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElement}
            </div>

            <div className={s.messages}>
                {messagesElement}
            </div>
        </div>
    );
};

export default Dialogs;