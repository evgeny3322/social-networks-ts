import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/img/3135715.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {Pagination} from "@mui/material";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>,
    followUsers: (userId: number) => void
    unFollowUsers: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
}


const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div className={s.pagination}>
                <Pagination count={pages.length}
                            page={props.currentPage}
                            onChange={(e, num) => props.onPageChanged(num)}
                />
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <div className={s.users__item}>
                        <div className={s.users__img}>
                            <NavLink to={'/profile/' + u.id}>
                                <img className={s.userPhoto}
                                     src={u.photos.small !== null ? u.photos.small : userPhoto}
                                     alt={'ava'}
                                />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => {
                                        props.unFollowUsers(u.id)
                                    }}
                                >Unfollow</button>
                                : <button
                                    onClick={() => {
                                        props.followUsers(u.id)
                                    }}>
                                    Follow</button>
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
};

export default Users;