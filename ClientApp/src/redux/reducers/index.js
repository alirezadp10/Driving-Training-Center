import {AUTHORIZATION, SET_USER_INFO} from "../constants/action-types";

const initialState = {
    isAuthorized: !!localStorage["token_type"],
    user        : localStorage["user"] ? JSON.parse(localStorage["user"]) : null,
};

function rootReducer(state = initialState, action) {
    if (action.type === SET_USER_INFO) {
        return Object.assign({}, state, {
            user: action.payload,
        });
    }
    if (action.type === AUTHORIZATION) {
        return Object.assign({}, state, {
            isAuthorized: action.payload.status === "authorized",
        });
    }
    return state;
}

export default rootReducer;
