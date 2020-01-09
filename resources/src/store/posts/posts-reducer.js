import {success} from "redux-saga-requests";
import {FETCH_POSTS, POST_ROLLBACK, REMOVE_POST} from "./posts-actions";

const initialState = {
    data: [],
    current_page: 0,
    last_page: 1
};

const postsReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case success(FETCH_POSTS):
            return {
                ...state,
                data: [...action.payload.data],
                current_page: action.payload.data.current_page,
                last_page: action.payload.data.last_page

            };
        case success(REMOVE_POST):
            return {
                ...state,
                data: [...state.data.filter(post => post.id !== action.meta.post.id)]
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