import {DialogsProfileReducersActionsTypes} from "./profile-reducer";
import {DialogItemType} from "../components/Dialogs/DialogItem/DialogItem";
import {MessageType} from "../components/Dialogs/Message/Message";


export type updateNewMessageBodyActionType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    body: string
}

export type sendMessageActionType = {
    type: 'SEND-MESSAGE'
    newMessage: string
}


export type DialogsReducerStateType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageType>
}

let initialState = {
    messages: [
        {id: 1, message: 'Hello!'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'What is your name?'},
        {id: 4, message: 'Come on'},
        {id: 5, message: 'Hey, where are you from?'},
        {id: 6, message: 'Okay'}
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, name: 'Valera'},
        {id: 2, name: 'Sergey'},
        {id: 3, name: 'Anton'},
        {id: 4, name: 'Veronika'},
        {id: 5, name: 'Aleksandr'},
        {id: 6, name: 'Artem'}
    ] as Array<DialogItemType>
}

export const dialogsReducer = (state: DialogsReducerStateType = initialState, action: DialogsProfileReducersActionsTypes): DialogsReducerStateType => {

    switch (action.type) {
        case 'SEND-MESSAGE':
            let body = action.newMessage;
            return {...state, messages: [...state.messages, {id: new Date().getTime(), message: body}]};
        default:
            return state;
    }
}

export const sendMessage = (newMessage: string): sendMessageActionType => ({type: 'SEND-MESSAGE', newMessage})

