import React from 'react';
import s from "./Post.module.css";

export type PostPropsType = {
    message: string,
    likeCount: number,
    id: number
}

const Post = (props:PostPropsType) => {
    return (
        <div className={s.post__item}>

            <div className={s.post__photo}>
                <img className={s.post__img} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=""/>
            </div>

            <div>
                <div className={s.post__text}>
                    {props.message}
                </div>
                <span>
                    likes
                    {props.likeCount}
                </span>
            </div>
        </div>
    );
};

export default Post;