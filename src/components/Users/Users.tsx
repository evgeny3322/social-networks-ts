import React from 'react';
import {UsersPropsType} from "./UsersContainer";
import s from "./Users.module.css"

const Users = (props: UsersPropsType) => {
    if (props.usersPage.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                followed: true,
                fullName: 'userOn',
                status: 'Good dayOn',
                location: {city: 'CityOn', country: 'CountryOn'}
            },
            {
                id: 2,
                photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                followed: true,
                fullName: 'userTw',
                status: 'Good dayTw',
                location: {city: 'CityTw', country: 'CountryTw'}
            },
            {
                id: 3,
                photoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                followed: false,
                fullName: 'userThr',
                status: 'Good dayThr',
                location: {city: 'CityThr', country: 'CountryThr'}
            },
        ])
    }
    return (
        <div>
            {
                props.usersPage.users.map(u => <div key={u.id}>
                    <div>
                        <div className={s.users__img}>
                            <img src={u.photoUrl} alt="photo"/>
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
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </div>
                        <div>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
};

export default Users;