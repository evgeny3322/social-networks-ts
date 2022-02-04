import s from "./Navbar.module.css";
import React from "react";
import {NavLink} from "react-router-dom";


function Navbar() {
    return <nav className={s.navbar}>
        {/*<div className={`${s.item} ${s.active}`}>*/}
        {/*    <NavLink to="/profile">*/}
        {/*        Profile*/}
        {/*    </NavLink>*/}
        {/*</div>*/}
        {/*<div className={`${s.item} ${s.active}`}>*/}
        {/*    <NavLink className={navData => navData.isActive ? s.activeLink:s.item} to="/dialogs">*/}
        {/*        Messages*/}
        {/*    </NavLink>*/}
        {/*</div>*/}
        {/*<div className={`${s.item} ${s.active}`}>*/}
        {/*    <a className={s.val}>*/}
        {/*        News*/}
        {/*    </a>*/}
        {/*</div>*/}
        {/*<div className={`${s.item} ${s.active}`}>*/}
        {/*    <a className={s.val}>*/}
        {/*        Music*/}
        {/*    </a>*/}
        {/*</div>*/}
        {/*<div className={`${s.item} ${s.active}`}>*/}
        {/*    <a className={s.val}>*/}
        {/*        Settings*/}
        {/*    </a>*/}
        {/*</div>*/}
        <div className={`${s.navbar__item} ${s.active}`}>
                <NavLink to="/profile">
                    Profile
                </NavLink>
        </div>
        <div className={`${s.navbar__item} ${s.active}`}>
            <a className={s.navbar__link}>
                Messages
            </a>
        </div>
        <div className={`${s.navbar__item} ${s.active}`}>
            <a className={s.navbar__link}>
                News
            </a>
        </div>
        <div className={`${s.navbar__item} ${s.active}`}>
            <a className={s.navbar__link}>
                Music
            </a>
        </div>
        <div className={`${s.navbar__item} ${s.active}`}>
            <a className={s.navbar__link}>
                Settings
            </a>
        </div>
    </nav>
}

export default Navbar