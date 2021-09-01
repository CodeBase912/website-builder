import React from "react";
import "./Login.css";

function Login() {
  function handleSubmit(event) {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:80/site-builder-app/api/login", true);
    xhr.onload = function () {
      if (this.status === 200) {
        console.log(this.responseText);
      }
    };
    xhr.send();
  }
  return (
    <div className='form-wrapper'>
      <form onSubmit={handleSubmit} className='form'>
        <h3 className='form-title'>Login</h3>
        <input
          type='text'
          name='username'
          placeholder='Username/Email'
          className='form-input'
        />
        <input
          type='text'
          name='pwd'
          placeholder='Password'
          className='form-input'
        />
        <input type='submit' value='Submit' className='form-submit' />
      </form>
      <div className='form-links-wrapper'>
        <a href='' className='form-forgot-pwd-link'>
          Forgot passord?
        </a>
        <p className='form-signup-link-wrapper'>
          No account?{" "}
          <a href='' className='form-signup-link'>
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
