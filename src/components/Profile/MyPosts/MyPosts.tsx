import React, {useState, MutableRefObject, ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostsTypeProps, } from "../../../redux/state";


type MyPostsPropsType ={
    posts: Array<PostsTypeProps>
    addPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
}

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElement = props.posts.map((post, i) => <Post message={post.message} like={post.like} id={i}/>)

    let newPostElement = React.useRef<HTMLTextAreaElement | null>(null);

    let addPost = () => {
        props.addPost()
    }

    const onPostChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        // let text = newPostElement.current!.value
        // props.updateNewPostText(text)
        props.updateNewPostText(e.currentTarget.value)
    }


    return <div className={s.myposts}>
        <div>
            <h3>
                My posts
            </h3>

            <div className={s.myposts__addpost}>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}/>
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