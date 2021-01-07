import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
    // Reducers go here.
    alert,
    auth,
    profile
});