import React from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {AuthReducerStateType} from "../../redux/auth-reducer";

type HeaderPropsType = AuthReducerStateType & {
    setAuthUserData: (id: number, email: string, login: string) => void
    makeLogOut: () => void
}

const Header = (props: HeaderPropsType) => {
    return (
        <div className={s.header}>
            <div className={s.header__photo}>
                <img className={s.header__img} src="https://www.svgx.ru/svg/2930674.svg" alt=""/>
            </div>
            <div className={s.loginBlock}>
                <div className={s.loginBlock}>
                    {props.isAuth
                        ? <div>
                            <span>{props.login}</span>
                            <button className={s.buttonLogin}
                                    onClick={props.makeLogOut}
                            >Sign Out
                            </button>
                        </div>
                        : <NavLink to='/login'>
                            <h1 className={s.loginText}>Login</h1>
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;


