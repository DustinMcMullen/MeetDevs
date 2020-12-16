import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';

export default combineReducers({
    // Reducers go here.
    alert,
    auth
});