import {authAPI, AuthResponseType} from "../api/api";
import {DispatchType, ThunkType} from "./redux-store";
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
        case 'auth/SET-AUTH-USER-DATA':
            return {...state, ...action.data, isAuth: true};
        default:
            return state;
    }
}

export const setAuthUserData = (id: number, email: string, login: string) => {
    return {type: 'auth/SET-AUTH-USER-DATA', data: {id, email, login}} as const
}

//ThunkCreator
export const getAuthUserData = (): ThunkType => async (dispatch: DispatchType) => {
    let response: AuthResponseType = await authAPI.getAuth();
    if (response.resultCode === 0) {
        let {id, email, login} = response.data;
        dispatch(setAuthUserData(id, email, login));
    }
}

export const makeLogIn = (email: string, password: string, rememberMe: boolean): ThunkType =>
    async (dispatch: DispatchType) => {
        let response = await authAPI.logIn(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            window.location.reload();
        } else {
            let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit('login', {_error: errorMessage}));
        }
    }

export const makeLogOut = (): ThunkType => async (dispatch: DispatchType) => {
    let response = await authAPI.logOut();
    window.location.reload();
}