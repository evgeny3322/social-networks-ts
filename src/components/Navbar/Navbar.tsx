import s from "./Navbar.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

type NavBarProps = {
    // sidebar: SidebarTypeProps
}


function Navbar(props:NavBarProps) {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink className={navData => navData.isActive ? s.activeLink : s.item} to="/profile">
                    Profile
                </NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink className={navData => navData.isActive ? s.activeLink : s.item} to="/dialogs">
                    Messages
                </NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <a className={s.item__link}>
                    News
                </a>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <a className={s.item__link}>
                    Music
                </a>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <a className={s.item__link}>
                    Settings
                </a>
            </div>
            {/*<Sidebar sidebar={props.sidebar}/>*/}
        </nav>
    )
}

export default Navbar