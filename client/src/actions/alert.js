import {SET_ALERT, REMOVE_ALERT} from './types.js';
import {v4 as uuidv4} from 'uuid';


export const setAlert = (msg, alertType)=> dispatch=> {
    const id = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {
            msg: msg,
            alertType: alertType,
            id: id
        }
    });
    // wait 5 seconds & dispatch REMOVE_ALERT
    setTimeout(() => 
        dispatch({
            type: REMOVE_ALERT,
            payload: {
                id
            }
        }), 5000);
}