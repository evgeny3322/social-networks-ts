import React, {RefObject} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import {DialogsPadeTypeProps} from "../../redux/state";

const Dialogs: React.FC<DialogsPadeTypeProps> = (props) => {

    let dialogsElement = props.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)

    let messagesElement = props.messages.map((m) => <Message message={m.message} id={m.id}/>)

    let newMessageElement: RefObject<HTMLTextAreaElement> = React.createRef();

    let addMessage = () => {
        let text = newMessageElement.current!.value;
        alert(text)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElement}
            </div>

            <div className={s.messages}>
                {messagesElement}
            </div>

            <div className={s.messageAdd}>
                <div className={s.messageAdd__area}>
                    <textarea ref={newMessageElement}/>
                </div>

                <div className={s.messageAdd__button}>
                    <button onClick={addMessage}>
                        add messages
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;