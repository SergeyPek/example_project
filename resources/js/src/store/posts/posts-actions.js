import {setErrors} from "../errors/errors-actions";

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = (page = 1) => ({
    type: FETCH_POSTS,
    payload: {
        request: {
            url: `/posts?page=${page}`,
            method: 'GET'
        }
    },
    meta: {
        asPromise: true
    }
});

export const REMOVE_POST = 'REMOVE_POST';
export const removePost = (post) => ({
    type: REMOVE_POST,
    payload: {
        request: {
            url: `/posts/${post.id}`,
            method: 'DELETE'
        }
    },
    meta: {
        post,
        asPromise: true
    }
});

export const POST_ROLLBACK = 'POST_ROLLBACK';
export const postRollback = (post) => ({
    type: POST_ROLLBACK,
    payload: {
        post: post
    },
    local: true
});

export const reFetchPosts = (page) => async (dispatch) => {
    try {
        await dispatch(fetchPosts(page));
    } catch (error) {
        dispatch(setErrors(['Something went wrong, can not fetch posts. Please try again later.']));
    }
};

export const removeAndFetchPosts = (post, page) => async (dispatch) => {
    try {
        await dispatch(removePost(post));
        await dispatch(fetchPosts(page));
    } catch (error) {
        dispatch(setErrors(['Something went wrong, can not remove the post. Please try again later.']));
        dispatch(postRollback(post));
    }
};
