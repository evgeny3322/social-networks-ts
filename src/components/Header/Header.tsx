import React from 'react';
import s from "./Header.module.css";

function Header() {
    return (
        <div className={s.header}>
            <div className={s.header__photo}>
                <img className={s.header__img} src="https://www.svgx.ru/svg/2930674.svg" alt=""/>
            </div>
        </div>
    )
}

export default Header;