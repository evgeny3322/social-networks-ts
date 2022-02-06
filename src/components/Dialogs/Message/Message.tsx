import React from 'react';
import s from "./Message.module.css";
import {MessagesTypeProps} from "../../../redux/state";

const Message: React.FC<MessagesTypeProps> = (props) => {
    return < div className={s.message}>
        {props.message}
    </div>
};
export default Message;