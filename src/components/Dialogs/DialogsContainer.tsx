import React from 'react';
import {
    DialogsReducerStateType,
    sendMessage,
    updateNewMessageBody,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

type MapStateToPropsType = {
    dialogsPage: DialogsReducerStateType
}

type MapDispatchToPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (body: string) => void,
}

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export const DialogsContainer = compose<React.ComponentType>(connect(mapStateToProps, {
    sendMessage,
    updateNewMessageBody
}), WithAuthRedirect)(Dialogs);
export default DialogsContainer;