import {authAPI, AuthResponseType} from "../api/api";
import {ThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";

export type AuthReducerStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

const initialState: AuthReducerStateType = {
    id: 0,
    email: '',
    login: '',
    isAuth: false
}

type setAuthUserDataAT = ReturnType<typeof setAuthUserData>;

export type AuthReducerActionsType = setAuthUserDataAT;

export const authReducer = (state: AuthReducerStateType = initialState, action: AuthReducerActionsType): AuthReducerStateType => {
    switch (action.type) {
        case 'SET-AUTH-USER-DATA':
            return {...state, ...action.data, isAuth: true};
        default:
            return state;
    }
}

export const setAuthUserData = (id: number, email: string, login: string) => {
    return {type: 'SET-AUTH-USER-DATA', data: {id, email, login}} as const
}

//ThunkCreator

export const getAuthUserData = (): ThunkType => (dispatch) => {
    return authAPI.getAuth()
        .then((data: AuthResponseType) => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        });
}

export const makeLogIn = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return (dispatch) => {
        authAPI.logIn(email, password, rememberMe)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    console.log(response);
                    window.location.reload();
                } else {
                    let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                    dispatch(stopSubmit('login', {_error: errorMessage}));
                }
            })
    }
}

export const makeLogOut = (): ThunkType => {
    return (dispatch) => {
        authAPI.logOut()
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
    }
}