import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI, AuthResponseType} from "../api/api";

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

type AuthActionsType = setAuthUserDataAT;

export const authReducer = (state: AuthReducerStateType = initialState, action: AuthActionsType): AuthReducerStateType => {
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

export type DispatchAuthType = ThunkDispatch<AuthReducerStateType, unknown, AuthActionsType>;
export type ThunkAuthType = ThunkAction<void, AuthReducerStateType, unknown, AuthActionsType>;

export const getAuthUserData = (): ThunkAuthType => {
    return (dispatch: DispatchAuthType) => {
        authAPI.getAuth()
            .then((data: AuthResponseType) => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            });
    }
}

export const makeLogIn = (email: string, password: string, rememberMe: boolean): ThunkAuthType => {
    return (dispatch: DispatchAuthType) => {
        authAPI.logIn(email, password, rememberMe)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
    }
}

export const makeLogOut = (): ThunkAuthType => {
    return (dispatch: DispatchAuthType) => {
        authAPI.logOut()
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
    }
}