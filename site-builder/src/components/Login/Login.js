import React from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input type='text' name='username' placeholder='Username/Email' />
        <input type='text' name='pwd' placeholder='Password' />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Login;
