import React from 'react';
import "../style/footer.css";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

function Footer() {
  const [user] = useAuthState(auth);
  let navigate = useNavigate();
  const handlesignout=()=>{
    signOut(auth);
    const pathname = window.location.pathname;
    if(pathname=="/"){
        document.querySelector(`#bd`).scrollIntoView();
    }
    else{
        navigate("/");
    }
}
  return (
    <div className="footer">
      <div  className='f-card'>
        <div className='f-card-upper'>
          <div className='f-topic-text'>
            <h1>Discover more of topics</h1>
          </div>
          <div className='f-topic'>
            <div className='f-topic-name'>india</div>
            <div className='f-topic-name'>nationality</div>
            <div className='f-topic-name'>temple</div>
            <div className='f-topic-name'>country</div>
          </div>
        </div>
        <div className='footer-card-lower'>
          <div className='footer-link'>Home</div>
          <div className='footer-link'>About</div>
          {user?<div onClick={handlesignout} className='footer-link'>signOut</div>:<Link to="/signin" style={{ textDecoration: 'none',color:'black' }}><div className='footer-link'>signIn</div></Link>}
        </div>
      </div>
    </div>
  )
}

export default Footer