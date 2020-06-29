import {AUTHORIZATION, SET_USER_INFO} from "../constants/action-types";

export function authorization(payload) {
    return {type: AUTHORIZATION, payload};
}

export function setUserInfo(payload) {
    return {type: SET_USER_INFO, payload};
}
