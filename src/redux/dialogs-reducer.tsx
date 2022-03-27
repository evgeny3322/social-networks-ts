import React from 'react';
import {ActionsTypes, DialogItemPropsType, DialogsPadeTypeProps, MessagesTypeProps} from "./state";

export type ActionsDialogsTypes = ReturnType<typeof addPostAC> | ReturnType<typeof changeNewTextAC>


export const addPostAC = (postText: string) => {
    return {
        type: "ADD-POST",
        postText: postText
    } as const
}

export const changeNewTextAC = (newText: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    } as const
}

export type DialogsReducerType = {
    dialogs: DialogItemPropsType[]
    messages: MessagesTypeProps[]
    newMessageBody: string
}

let initialState: DialogsReducerType = {
    messages: [
        {id: 1, message: "Hi PersonOne"},
        {id: 2, message: "Hi PersonTwo"},
        {id: 3, message: "Hi PersonThree"},
    ] as MessagesTypeProps[],
    newMessageBody: '',
    dialogs: [
        {id: 1, name: "Person1"},
        {id: 2, name: 'Person2'},
        {id: 3, name: 'Person3'},
    ] as DialogItemPropsType[]
}
export const DialogsReducer = (state: DialogsReducerType = initialState, action: ActionsTypes): DialogsReducerType => {

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

};



