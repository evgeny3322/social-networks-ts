import React from 'react';
import {addPostCreator, ProfileReducerStateType, updateNewPostTextCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    profilePage: ProfileReducerStateType
}

type MapDispatchToPropsType = {
    updateNewPostText: (text: string) => void,
    addPost: () => void
}

export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType) : MapStateToPropsType => {
    return {
        profilePage: state.profilePage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) : MapDispatchToPropsType => {
    return {
        addPost: () => {
            dispatch(addPostCreator())
        },
        updateNewPostText: (text: string) => {
            dispatch(updateNewPostTextCreator(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

