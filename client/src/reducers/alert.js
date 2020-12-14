import {SET_ALERT, REMOVE_ALERT} from '../actions/types';
// inside this array we will hold all the alerts as objects like-> {id: ---, msg: --- alert_type: ---}
const initialState = [];

// action will include the type & payload. (payload includes all data).
export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        // Here we could just put the type as a string "SET_ALERT"....
        // However, common convention is to set action types as variables. All these types variables will be saved in a types.js file.
        case SET_ALERT:
            return[...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert=> alert.id!== payload.id);
            default:
                return state;
    }
}