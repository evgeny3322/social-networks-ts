import {ActionsTypes} from "./profile-reducer";
import {DialogItemType} from "../components/Dialogs/DialogItem/DialogItem";
import {MessageType} from "../components/Dialogs/Message/Message";


export type updateNewMessageBodyActionType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    body: string
}

export type sendMessageActionType = {
    type: 'SEND-MESSAGE'
}


export type DialogsReducerStateType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageType>
    newMessageBody: string
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
    newMessageBody: '',
    dialogs: [
        {id: 1, name: 'Valera'},
        {id: 2, name: 'Sergey'},
        {id: 3, name: 'Anton'},
        {id: 4, name: 'Veronika'},
        {id: 5, name: 'Aleksandr'},
        {id: 6, name: 'Artem'}
    ] as Array<DialogItemType>
}

export const dialogsReducer = (state: DialogsReducerStateType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            return {...state, newMessageBody: action.body};
        case 'SEND-MESSAGE':
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: new Date().getTime(), message: body}]
            };
        default:
            return state;
    }
}

export const updateNewMessageBody = (body: string): updateNewMessageBodyActionType =>
    ({type: 'UPDATE-NEW-MESSAGE-BODY', body: body})

export const sendMessage = (): sendMessageActionType => ({type: 'SEND-MESSAGE'})


