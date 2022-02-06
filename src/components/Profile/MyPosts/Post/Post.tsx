import React from 'react';
import s from "./Post.module.css";
import {PostsTypeProps} from "../../../../redux/state";



const Post: React.FC<PostsTypeProps> = (props) => {
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
                    like {props.like}
                </span>
            </div>
        </div>
    );
};

export default Post;