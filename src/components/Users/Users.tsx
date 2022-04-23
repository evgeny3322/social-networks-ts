import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/img/3135715.png";
import {unFollow, UserType} from "../../redux/users-reducer";
import {Pagination} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>,
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    toggleFollowingInProgress: (followingInProgress: boolean, userId: number) => void,
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
                                    disabled={props.followingInProgress.some(id => id === u.id)}                                    onClick={() => {
                                        props.toggleFollowingInProgress(true, u.id);
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "262e2c2b-b3e7-4ca9-aebd-afd6b759e25e"
                                            }
                                        })
                                            .then(response => {
                                                if (response.data.resultCode == 0) {
                                                    props.unFollow(u.id)
                                                }
                                                props.toggleFollowingInProgress(false, u.id);
                                            })
                                    }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.toggleFollowingInProgress(true, u.id);
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY": "262e2c2b-b3e7-4ca9-aebd-afd6b759e25e"
                                        },
                                    })
                                        .then(response => {
                                            if (response.data.resultCode == 0) {
                                                props.follow(u.id)
                                            }
                                            props.toggleFollowingInProgress(false, u.id);
                                        })
                                }}>Follow</button>
                            }
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                        <div>
                            {/*<div>{u.location.country}</div>*/}
                            {/*<div>{u.location.city}</div>*/}
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
};

export default Users;