import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";


const Dialogs = (props: DialogsPropsType) => {

    const dialogsElements = props.dialogsPage.dialogs.map((d, index) =>
        <DialogItem
            key={d.id}
            id={d.id}
            name={d.name}
        />
    );

    const messagesElements = props.dialogsPage.messages.map((m, index) =>
        <Message
            key={m.id}
            id={m.id}
            message={m.message}
        />
    );

    const newMessageBody = props.dialogsPage.newMessageBody;

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.updateNewMessageBody(body);
    }

    const onSendMessageClick = () => {
        props.sendMessage();
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
            </div>

            <div className={s.messageAdd}>
                <div className={s.messageAdd__area}>
                    <textarea
                        onChange={onNewMessageChange}
                        value={newMessageBody}
                        placeholder={'Enter your message'}>
                    </textarea>
                </div>

                <div className={s.messageAdd__button}>
                    <button onClick={onSendMessageClick}>
                        add messages
                    </button>
                </div>

            </div>

        </div>
    );
};

export default Dialogs;