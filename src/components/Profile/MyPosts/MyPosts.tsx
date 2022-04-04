import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {ActionsTypes, addPostAC, changeNewTextAC, PostsTypeProps,} from "../../../redux/state";


type MyPostsPropsType = {
    posts: Array<PostsTypeProps>
    // addPost: () => void
    newPostText: string
    updateNewPostText: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
}

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let postsElement = props.posts.map((post, i) => <Post message={post.message} like={post.like} id={i}/>)

    let newPostElement = React.useRef<HTMLTextAreaElement | null>(null);

    let addPost = () => {
        props.dispatch(addPostAC(props.newPostText))
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        console.log('onPostChange', e.currentTarget.value)
        // props.dispatch(changeNewTextAC(props.newPostText))
        props.dispatch(changeNewTextAC(e.currentTarget.value))
    }


    return <div className={s.myposts}>
        <div>
            <h3>
                My posts
            </h3>

            <div className={s.myposts__addpost}>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
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