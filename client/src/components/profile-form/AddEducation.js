import React from 'react';
import PropTypes from 'prop-types';
import {useState, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/profile';

const AddEducation = ({addEducation, history}) => {

    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    })

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;

    const [toDateDisabled, toggleToDate] = useState(false);

    function updateFormData (input) {
        const inputName = input.target.name;
        const inputValue = input.target.value
        setFormData({
            ...formData,
            [inputName]: inputValue
        });
    };

    function submitFormData (input) {
        input.preventDefault();
        addEducation(formData, history);
    };

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form">
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    required
                    onChange={updateFormData}
                    value={school}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    required
                    onChange={updateFormData}
                    value={degree}
                />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field Of Study" name="fieldofstudy" onChange={updateFormData} value={fieldofstudy} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" onChange={updateFormData} value={from} />
                </div>
                <div className="form-group">
                <p>
                    <input
                        type="checkbox"
                        name="current"
                        onChange={()=>{
                            setFormData({
                                ...formData,
                                current: !current
                            });
                            toggleToDate(!toDateDisabled);
                        }}
                        value={current}
                    /> Current School or Bootcamp
                </p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" onChange={updateFormData} value={to} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    onChange={updateFormData}
                    value={description}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" onClick={submitFormData} />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
}

AddEducation.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addEducation} )(withRouter(AddEducation));