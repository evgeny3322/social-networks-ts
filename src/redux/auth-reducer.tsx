import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {authAPI, AuthResponseType} from "../api/api";

export type AuthReducerStateType = {
    userId: number,
    email: string,
    login: string,
    isAuth: boolean
}

const initialState: AuthReducerStateType = {
    userId: 0,
    email: '',
    login: '',
    isAuth: false
}

type setAuthUserDataAT = {
    type: 'SET-USER-DATA',
    data: {
        userId: number,
        email: string,
        login: string
    }
}

type AuthActionsType = setAuthUserDataAT;

export const authReducer = (state: AuthReducerStateType = initialState, action: AuthActionsType) : AuthReducerStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {...state, ...action.data, isAuth: true}
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number, email: string, login: string): setAuthUserDataAT => ({
    type: 'SET-USER-DATA',
    data: {userId, email, login}
})

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