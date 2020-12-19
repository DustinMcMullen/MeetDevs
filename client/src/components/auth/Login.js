import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {login} from '../../actions/auth';
import propTypes from 'prop-types';


function Login (props) {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = formData;

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function submitForm(event){
        event.preventDefault();
            props.login(email, password);

    }

    return(
        <Fragment>
                  <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign in to your account</p>
      <form className="form" onSubmit={submitForm}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register an account</Link>
      </p>
        </Fragment>
    )
}

Login.propTypes = {
  login: propTypes.func.isRequired,
};


export default connect(null, {setAlert, login})(Login);