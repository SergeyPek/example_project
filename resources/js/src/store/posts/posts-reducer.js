import {success} from "redux-saga-requests";
import {FETCH_POSTS, POST_ROLLBACK, REMOVE_POST} from "./posts-actions";

const initialState = {
    data: [],
    current_page: 1,
    total: 0,
    per_page: 5,
    pending: true
};

const postsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case success(FETCH_POSTS):
            return {
                ...state,
                ...action.payload.data.meta,
                data: action.payload.data.data,
                pending: false
            };
        case success(REMOVE_POST):
            return {
                ...state,
                data: [...state.data.filter(post => post.id !== action.meta.post.id)],
            };
        case POST_ROLLBACK:
            return {
                ...state,
                data: state.data.map((post) => {
                    if (post.id === action.payload.post.id) {
                        post = action.payload.post;
                    }
                    return post;
                })
            }
        default:
            return state;
    }
}

export default postsReducer;
