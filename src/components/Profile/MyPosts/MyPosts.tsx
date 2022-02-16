import React, {RefObject, MouseEvent, ChangeEvent, useState, MutableRefObject} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {addPost, ProfilePageTypeProps} from "../../../redux/state";
import {ProfilePropsType} from "../Profile";
import post from "./Post/Post";


type MyPostsPropsType = ProfilePropsType

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElement = props.posts.map((post,i) => <Post message={post.message} like={post.like} id={i}/>)

    let newPostElement = React.useRef<HTMLTextAreaElement | null >(null);

    let addPost = () => {
        let text = newPostElement.current?.value
        if (text) {
            (props.addPost(text))
        }
       if (newPostElement.current)  newPostElement.current.value = '';
    }

    return <div className={s.myposts}>
        <div>
            <h3>
                My posts
            </h3>

            <div className={s.myposts__addpost}>
                <div>
                    <textarea ref={newPostElement} />
                </div>

                <div>
                    {/*<button onClick={newPostElement}>*/}
                    <button onClick={addPost}>
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