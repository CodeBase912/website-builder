import React from 'react';

function Signup() {
  function handleSubmit(event) {
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/site-builder-app/api/signup', true);
    xhr.onload = function () {
      if (this.status == 200) {
        console.log(this.responseText);
      }
    };
    xhr.send();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <input type='text' name='username' placeholder='Username' />
        <input type='text' name='email' placeholder='Email' />
        <input type='text' name='pwd' placeholder='Password' />
        <input type='text' name='confrim-pwd' placeholder='Confirm Password' />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default Signup;
