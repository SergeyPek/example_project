import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import errorsReducer from "./errors/errors-reducer";
import postsReducer from "./posts/posts-reducer";
import rootSaga from "./sagas"
import thunk from "redux-thunk";
import {requestsPromiseMiddleware} from "redux-saga-requests";
import axios from "axios";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const setAxiosDefaults = (store) => (next) => (action) => {
    axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
    return next(action);
};

const store = createStore(
    combineReducers({
        posts: postsReducer,
        errors: errorsReducer,
    }),
    compose(applyMiddleware(
        thunk,
        setAxiosDefaults,
        requestsPromiseMiddleware(),
        sagaMiddleware
    ), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

sagaMiddleware.run(rootSaga);

export default store;