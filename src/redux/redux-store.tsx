import {combineReducers, createStore} from "redux";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";


export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    // sidebar: sidebarReducer
});


export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

export type ReduxStoreType = typeof store


