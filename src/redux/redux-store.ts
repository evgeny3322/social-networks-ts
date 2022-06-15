import {applyMiddleware, combineReducers, createStore} from "redux";
import {DialogsProfileReducersActionsTypes, profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {usersReducer, UsersReducerActionsTypes} from "./users-reducer";
import {authReducer, AuthReducerActionsType} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {ThunkAction,ThunkDispatch} from "redux-thunk";

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    // sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>;
export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>;

export type AppActionsType =
    AppReducerActionsType
    | AuthReducerActionsType
    | DialogsProfileReducersActionsTypes
    | UsersReducerActionsTypes;

export type ReduxStoreType = typeof store;





