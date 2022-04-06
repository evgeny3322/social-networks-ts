import {ActionsTypes} from "./profile-reducer";
import {DialogItemPropsType} from "../components/Dialogs/DialogItem/DialogItem";
import {MessagePropsType} from "../components/Dialogs/Message/Message";


export type updateNewMessageBodyActionType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    body: string
}

export type sendMessageActionType = {
    type: 'SEND-MESSAGE'
}


export type DialogsReducerStateType = {
    dialogs: Array<DialogItemPropsType>
    messages: Array<MessagePropsType>
    newMessageBody: string
}

let initialState = {
    messages: [
        {id: 1, message: 'Message1'},
        {id: 2, message: 'Message2'},
        {id: 3, message: 'Message3'},
    ],
    newMessageBody: '',
    dialogs: [
        {id: 1, name: 'PersonOne'},
        {id: 2, name: 'PersonTwo'},
        {id: 3, name: 'PersonThree'},
    ]
}

export const dialogsReducer = (state: DialogsReducerStateType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            state.newMessageBody = action.body;
            return state;
        case 'SEND-MESSAGE':
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({id: 6, message: body});
            return state;
        default:
            return state;
    }
}

export const updateNewMessageBodyCreator = (body: string): updateNewMessageBodyActionType =>
    ({type: 'UPDATE-NEW-MESSAGE-BODY', body: body})

export const sendMessageCreator = (): sendMessageActionType => ({type: 'SEND-MESSAGE'})


