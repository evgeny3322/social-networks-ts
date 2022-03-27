import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from "./Message/Message";
import {
    ActionsTypes,
    DialogItemPropsType,
    DialogsPadeTypeProps, messageNewTextAC,
    MessagesTypeProps,
    sendMessageAC,
    StoreType
} from "../../redux/state";


type DialogsPropsType = {
    // dialogsPage: {
    //     dialogs: Array<DialogItemPropsType>
    //     messages: Array<MessagesTypeProps>
    //     newMessageBody: string
    // },
    // updateNewMessageBody: (body: string) => void
    // sendMessageAC: () => void
    store: StoreType
    dispatch: (action: ActionsTypes) => void
    // messageNewTextAC: (body: string) => void
    // dialogsPage:DialogsPadeTypeProps
}


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    //Example from MyPost Component
    // let postsElement = props.posts.map((post, i) => <Post message={post.message} like={post.like} id={i}/>)
    //
    // let newPostElement = React.useRef<HTMLTextAreaElement | null>(null);
    const state = props.store.getState()

    const dialogsElements = state.dialogsPage.dialogs.map((d, i) => <DialogItem key={i} id={d.id} name={d.name}/>);
    const messagesElements = state.dialogsPage.messages.map((m, i) => <Message key={i} id={m.id} message={m.message}/>);

    const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.dispatch(messageNewTextAC(body));
    }

    const onSendMessageClick = () => {
        props.dispatch(sendMessageAC());
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
                        value={state.newMessageBody}
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