import React from 'react';
import s from "./Message.module.css";

export type MessageType = {
    message: string,
    id: number
}

const Message: React.FC<MessageType> = (props) => {
    return <div className={s.message}>
        {props.message}
    </div>
};
export default Message;

