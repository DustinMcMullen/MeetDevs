import react from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const Alert = ({alerts}) =>
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
));

// This checks to make sure the type of data passed for ALERT is correct & present.
Alert.propTypes = {
    alerts: propTypes.array.isRequired
};

// This allows us to get the alert state (the aray containing the alerts from the reducer).
    // alerts - is the name we are giving the name of the prop we want to have access to.
    // state - refers to the rootReducer (index.js file within reducers folder containing combineReducers).
    // .alert - refers to the reducer we want access to within the rootReducer. (in this case the alert reducer).
const mapStateToProps = state => ({
    alerts: state.alert
});

// pass in mapStateToProps instead of (state, {action})
export default connect(mapStateToProps)(Alert);