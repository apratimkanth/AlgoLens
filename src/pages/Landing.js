import  {React, useState } from 'react';
import "../style/landing.css";
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import Articles from '../components/Articles';




function Landing() {
    let navigate = useNavigate();
    const [user] = useAuthState(auth);
    const start_reading=()=>{
        <Link to='#main'/>
    }

    const get_started=()=>{
        {user ? navigate("/home"):navigate("/signin")};
    }
    const handlesignout=()=>{
        signOut(auth);
        navigate("/");
    }

  return (
    <>
        <div className='bd'>
            <div className='co'>
                <nav className="navbar">
                    <div className="navbar-logo">
                        <Link to="/" style={{ textDecoration: 'none',color:'black' }}>Logo</Link>
                    </div>
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <Link to="/about" style={{ textDecoration: 'none',color:'black' }}>About</Link>
                        </li>
                        <li className="navbar-item">
                            {user?<Link to="home/write" style={{ textDecoration: 'none',color:'black' }}>Write</Link>:
                            <Link to="/signin" style={{ textDecoration: 'none',color:'black' }}>Write</Link>}
                        </li>
                        <li className="navbar-item">
                            {user?<div to="/signin" onClick={handlesignout} style={{ textDecoration: 'none',color:'black' }}>SignOut</div>:
                            <Link to="/signin" style={{ textDecoration: 'none',color:'black' }}>SignIn</Link>}
                        </li>
                    </ul>
                    <button className="navbar-button" onClick={get_started}>Get Started</button>
                </nav>
                <div className='middle'>
                    <div><h1>Keep Learning</h1></div>
                    <div><h3>“Success is not final, failure is not fatal: it is the courage to continue that counts.”</h3></div>
                    <div><button className="middle-button" onClick={start_reading}>Start Reading</button></div>
                </div>
                <div className='main' id='main'>
                    <div className='content'>
                        <Articles/>
                    </div>
                    {/* <Footer/> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default Landing