import React, {ChangeEvent} from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs, {DialogsPropsType} from "./Dialogs";
import {ReduxStoreType} from "../../redux/redux-store";

type DialogsContainerPropsType = {
    store: ReduxStoreType
}

const DialogsContainer = (props: DialogsContainerPropsType) => {


    let state = props.store.getState().dialogsPage;

    const onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))

    }

    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }


    return (
        <Dialogs
            updateNewMessageBody={onNewMessageChange}
            sendMessage={onSendMessageClick}
            dialogsPage={state}
        />
    );
};

export default DialogsContainer;