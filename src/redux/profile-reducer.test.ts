import {addPost, deletePost, profileReducer, ProfileReducerStateType} from "./profile-reducer";
import {PostPropsType} from "../components/Profile/MyPosts/Post/Post";

let initialState: ProfileReducerStateType = {
    posts: [
        {id: 1, message: 'MessageItem1', likeCount: 1},
        {id: 2, message: 'MessageItem2', likeCount: 2}
    ] as Array<PostPropsType>,
    profile: {
        aboutMe: 'aboutMe',
        contacts: {
            facebook: 'none',
            github: 'https://github.com',
            instagram: 'https://instagram.com/',
            mainLink: 'none',
            vk: 'none',
            twitter: 'none',
            website: 'none',
            youtube: 'none'
        },
        fullName: 'fullName',
        lookingForAJob: true,
        lookingForAJobDescription: 'lookingForAJobDescription',
        photos: {
            large: null,
            small: null
        },
        userId: 111
    },
    status: "",
    isFetching: false
}

test('new post should be added', () => {

    let newState = profileReducer(initialState, addPost("New Post"));

    expect(newState.posts.length).toBe(3);
    expect(newState.posts[0].message).toBe("New Post");
    expect(newState.posts[0].likeCount).toBe(0);
});

test('correct post should be deleted', () => {
    let newState = profileReducer(initialState, deletePost(1));

    expect(newState.posts.length).toBe(1);
    expect(newState.posts[0].message).toBe("MessageItem2");
    expect(newState.posts[0].likeCount).toBe(2);
})