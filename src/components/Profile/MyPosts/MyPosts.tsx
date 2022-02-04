import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";



const MyPosts = () => {
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
                <Post message={"Hi"} like={1}/>
                <Post message={"Hi2"} like={2}/>
                <Post message={"Hi3"} like={3}/>
            </div>

        </div>
    </div>
};

export default MyPosts;