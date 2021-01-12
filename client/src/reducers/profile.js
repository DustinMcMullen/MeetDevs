import {GET_PROFILE, CLEAR_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_EXPERIENCE, DELETE_EDUCATION} from '../actions/types';

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
        default :
            return state;
    }
};