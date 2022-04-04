import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem, {DialogItemPropsType} from './DialogItem/DialogItem';
import Message, {MessagePropsType} from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import { ActionsTypes } from '../../redux/profile-reducer';


type DialogsPropsType = {
    dialogsPage: {
        dialogs: Array<DialogItemPropsType>
        messages: Array<MessagePropsType>
        newMessageBody: string
    },
    dispatch: (action: ActionsTypes) => void
}


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const dialogsElements = props.dialogsPage.dialogs.map((d, index) => <DialogItem key={index} id={d.id} name={d.name} />);
    const messagesElements = props.dialogsPage.messages.map((m, index) => <Message key={index} id={m.id} message={m.message} />);

    const newMessageBody = props.dialogsPage.newMessageBody;

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.dispatch(updateNewMessageBodyCreator(body))

    }

    const onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
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