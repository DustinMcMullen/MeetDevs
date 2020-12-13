import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
// import axios from 'axios';


function Login () {

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
            // console.log(formData);
            // const loginUser = {
            //     email: email,
            //     password: password
            // }
            // try{
            //     const config = {
            //         headers: {
            //             'content-type': "application/json"
            //         }
            //     };

            //     const body = JSON.stringify(loginUser);
            //     const res = await axios.post('api/auth', body, config);
            //     console.log(res.data);
            // }
            // catch(err){
            //     console.error(err.response.data);
            // }
            console.log("successfully submitted form");
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

export default Login