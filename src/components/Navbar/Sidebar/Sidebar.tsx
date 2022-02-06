import React from 'react';
import s from "./Sidebar.module.css";
import Friend from "./Friend/Friend";
import {SidebarTypeProps} from "../../../redux/state";


type SidebarProps = {
    sidebar: SidebarTypeProps
}

const Sidebar = (props: SidebarProps) => {
    let sidebarElements =
        props.sidebar.friends.map((s) => <Friend id={s.id} img={s.img} name={s.name}/>);

    return (
        <div className={s.sidebar}>
            <div className={s.sidebar__block}>
                <span className={s.sidebar__span}>
                    Friends
                </span>
                <div className={s.sidebar__body}>
                    {sidebarElements}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;