// src/components/Register.js
import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" placeholder="Enter Username" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter Email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter Password" />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Link back to Login */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;