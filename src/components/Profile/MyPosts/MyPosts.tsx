import React, {RefObject} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {ProfilePageTypeProps} from "../../../redux/state";
import {ProfilePropsType} from "../Profile";


type MyPostsPropsType = ProfilePropsType

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElement =
        props.posts.map((post) => <Post message={post.message} like={post.like} id={1}/>)

    let newPostElement: RefObject<HTMLTextAreaElement> = React.createRef();

    let addPost = () => {
        let text = newPostElement.current?.value
        if (text) (props.addPost(text))
    }
    // let text = newPostElement.current!.value;
    // props.addPost(text);

    return <div className={s.myposts}>
        <div>
            <h3>
                My posts
            </h3>

            <div className={s.myposts__addpost}>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>

                <div>
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