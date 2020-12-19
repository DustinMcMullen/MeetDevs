import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import propTypes from 'prop-types';

function Register (props) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const {name, email, password, password2} = formData;

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function submitForm(event){
        event.preventDefault();
        if(password !== password2) {
            props.setAlert('Passwords do not match', 'danger');
        }
        else{
            console.log("successfully submitted form");
            props.register({name, email, password});
        }
    }

    if(props.isAuthenticated) {
      <Redirect to='/dashboard' />
    }

    return(
        <Fragment>
                  <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={submitForm}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            // required
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            // minLength="6"
            value={password}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            // minLength="6"
            value={password2}
            onChange={handleChange}
            // required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    )
}

const mapStateToProps = state=> ({
  isAuthenticated: state.auth.isAuthenticated
});

Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool
};

export default connect(mapStateToProps, {setAlert, register})(Register);