import React from 'react';
import {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profile';

const AddExperience = ({addExperience, history}) => {

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    });

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = formData;

    const [toDateDisabled, toggleToDate] = useState(false);

    function updateFormData (formInput) {
        const nameOfInput = formInput.target.name;
        const inputValue = formInput.target.value;
        setFormData({
            ...formData,
            [nameOfInput]: inputValue
        })
    };
    
    function submitFormData (submission) {
        submission.preventDefault();
        addExperience(formData, history);
    };

    return(
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form">
                <div className="form-group">
                <input onChange={updateFormData} type="text" placeholder="* Job Title" name="title" value ={title} required />
                </div>
                <div className="form-group">
                <input onChange={updateFormData} type="text" placeholder="* Company" name="company" value ={company} required />
                </div>
                <div className="form-group">
                <input onChange={updateFormData} type="text" placeholder="Location" name="location" value ={location} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input onChange={updateFormData} type="date" name="from" value ={from} />
                </div>
                <div className="form-group">
                <p><input 
                    onChange={() => {
                        setFormData({...formData, current: !current});
                        toggleToDate(!toDateDisabled);
                    }
                } type="checkbox" checked={current} name="current" value ={current} /> {" "} Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input onChange={updateFormData} type="date" name="to" value ={to} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                <textarea
                    onChange={updateFormData}
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value ={description}
                ></textarea>
                </div>
                <input onClick={submitFormData} type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(withRouter(AddExperience));