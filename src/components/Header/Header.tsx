import React from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    isAuth: boolean,
    login: string
}

function Header(props: HeaderPropsType) {
    return (
        <div className={s.header}>
            <div className={s.header__photo}>
                <img className={s.header__img} src="https://www.svgx.ru/svg/2930674.svg" alt=""/>
            </div>
            <div className={s.loginBlock}>
                <div className={s.loginBlock}>
                    { props.isAuth
                        ? props.login
                        : <NavLink to={'/login'}>Login</NavLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;