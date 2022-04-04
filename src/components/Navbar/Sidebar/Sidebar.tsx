import React from 'react';
import s from "./Sidebar.module.css";
import Friend, {FriendTypeProps} from "./Friend/Friend";


type SidebarProps = {
    sidebar: FriendTypeProps
}

const Sidebar = (props: SidebarProps) => {
    // let sidebarElements =
    //     props.sidebar.friends.map((s) => <Friend id={s.id} img={s.img} name={s.name}/>);

    return (
        <div className={s.sidebar}>
            <div className={s.sidebar__block}>
                <span className={s.sidebar__span}>
                    Friends
                </span>
                <div className={s.sidebar__body}>
                    {/*{sidebarElements}*/}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;