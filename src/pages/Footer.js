import React, { useEffect, useState } from 'react';
import "../style/footer.css";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import Topic from '../components/Topic';

function Footer({updateParentState}) {
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
            <Topic updateParentState={updateParentState}/>
          </div>
        </div>
        <div className='footer-card-lower'>
          <div className='footer-link' onClick={()=>updateParentState(null)}>
            <Link style={{ textDecoration: 'none',color:'black' }}>Home</Link>
          </div>
          <Link to="/about" style={{ textDecoration: 'none',color:'black' }}><div className='footer-link'>About</div></Link>
          {user?<div onClick={handlesignout} className='footer-link'>signOut</div>:<Link to="/signin" style={{ textDecoration: 'none',color:'black' }}><div className='footer-link'>signIn</div></Link>}
        </div>
      </div>
    </div>
  )
}

export default Footer