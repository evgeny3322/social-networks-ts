import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/img/3135715.png";
import {UsersReducerStateType, UserType} from "../../redux/users-reducer";

type PropsType = {
    follow: (userId: number) => void,
    unFollow: (userId: number) => void,
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void,
    setTotalUsersCount:(totalUsersCount:number) => void,
    usersPage: UsersReducerStateType
    onPageChanged:(pageNumber:number) => void
}


const Users = (props: PropsType) => {
    let pagesCount = Math.ceil(props.usersPage.totalUsersCount / props.usersPage.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map((p, i) => {
                    return <span key={i + 1}
                                 className={props.usersPage.currentPage === p ? s.selectedPage : ''}
                                 onClick={(e) => {
                                     props.onPageChanged(p)
                                 }}
                    > {p} </span>
                })}
            </div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <div className={s.users__item}>
                        <div className={s.users__img}>
                            <img className={s.userPhoto}
                                 src={u.photos.small !== null ? u.photos.small : userPhoto}
                                 alt={'ava'}
                            />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unFollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
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