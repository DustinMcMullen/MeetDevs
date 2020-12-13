import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
// import axios from 'axios';

function Register () {

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
            console.log("Passwords do not match")
        }
        else{
            // console.log(formData);
            // const newUser = {
            //     name: name,
            //     email: email,
            //     password: password
            // }
            // try{
            //     const config = {
            //         headers: {
            //             'content-type': "application/json"
            //         }
            //     };

            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('api/users', body, config);
            //     console.log(res.data);
            // }
            // catch(err){
            //     console.error(err.response.data);
            // }
            console.log("successfully submitted form");
        }
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
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
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
            minLength="6"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={handleChange}
            required
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

export default Register