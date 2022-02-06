import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {ProfilePageTypeProps} from "../../../redux/state";


const MyPosts: React.FC<ProfilePageTypeProps> = (props) => {

    let postsElement =
        props.posts.map((p) => <Post message={p.message} like={p.like} id={1}/>)


    return <div className={s.myposts}>
        <div>
            <h3>
                My posts
            </h3>

            <div className={s.myposts__addpost}>
                <div>
                    <textarea/>
                </div>

                <div>
                    <button>
                        add post
                    </button>
                </div>
            </div>

            <div className={s.post}>
                {postsElement}
            </div>

        </div>
    </div>
};

export default MyPosts;