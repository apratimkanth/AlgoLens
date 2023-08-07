import {React, useState } from 'react';
import "../style/signin.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { auth } from "../firebaseConfig";


function Signin() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast(error.code, { type: "error" });
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-container">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <div className='register'>
        <h1>Create an account :-</h1>
        <Link to="/register">  Register</Link>
      </div>
    </div>
  )
}

export default Signin