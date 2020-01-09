import axios from "axios";
import { createDriver } from 'redux-saga-requests-axios';
import {createRequestInstance, watchRequests} from 'redux-saga-requests';

export default function* rootSaga() {
    yield createRequestInstance({driver: createDriver(axios)});
    yield watchRequests();
}