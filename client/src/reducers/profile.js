import {GET_PROFILE, CLEAR_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_EXPERIENCE, DELETE_EDUCATION, GET_ALL_PROFILES, GET_GITHUB_REPOS} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_PROFILE :
        case UPDATE_PROFILE:
        case DELETE_EXPERIENCE:
        case DELETE_EDUCATION:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR :
            return {
                ...state,
                profile: null,
                loading: false,
                error: payload
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case GET_ALL_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false,
            }
        case GET_GITHUB_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default :
            return state;
    }
};