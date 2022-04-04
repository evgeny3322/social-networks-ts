import React from 'react';
import s from './MyPosts.module.css';
import Post, {PostPropsType} from "./Post/Post";
import {ActionsTypes, addPostCreator, updateNewPostTextCreator} from "../../../redux/profile-reducer";

type MyPostsPropsType = {
    posts: Array<PostPropsType>
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

const MyPosts = (props: MyPostsPropsType) => {
    const postElements = props.posts.map((p, index) =>
        <Post key={index} id={p.id} message={p.message} likeCount={p.likeCount}/>);

    const newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPost = () => {
        props.dispatch(addPostCreator())
    }

    const onPostChange = () => {
        let text = newPostElement.current!.value;
        props.dispatch(updateNewPostTextCreator(text))
    }

    return <div className={s.myposts}>
        <div>
            <h3>
                My posts
            </h3>

            <div className={s.myposts__addpost}>
                <div>
                    <textarea ref={newPostElement}
                              onChange={onPostChange}
                              value={props.newPostText}/>
                </div>

                <div>
                    {/*<button onClick={newPostElement}>*/}
                    <button onClick={addPost}>
                        add post
                    </button>
                </div>
            </div>

            <div className={s.post}>
                {postElements}
            </div>

        </div>
    </div>
};

export default MyPosts