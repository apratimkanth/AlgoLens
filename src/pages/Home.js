import React, { useState } from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom';
import "../style/home.css";
import { auth } from '../firebaseConfig';
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Articles from '../components/Articles';
import Footer from './Footer';
import Articles2 from '../components/Articles2';
 
  
function Home() {
    let navigate = useNavigate();
    const [filter_topic,setFilter_topic]=useState(null);
    const [value,setValue]=useState();
    const [user] = useAuthState(auth);
    const handlesignout=()=>{
        signOut(auth);
        navigate("/");
    }
    const updateParentState = (newState) => {
        setFilter_topic(newState);
    };
    const handleChangeComment = (e) => {
        if(e.key === "Enter"){
            if(value!=undefined){
                setFilter_topic(value);
            }
            else{
                setFilter_topic(null);
            }
        }
    };
  return (
    <>
        <nav className="navbar2">
            <div className="left-side2">
                <div className="navbar-logo2" onClick={()=>setFilter_topic(null)}>
                <Link to="/" style={{ textDecoration: 'none',color:'black' }}>Algo Lens</Link>
                </div>
                <div className="search-bar2">
                    <input type="text" placeholder="Search" 
                    onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        handleChangeComment(e);
                      }}
                    />
                </div>
            </div>
            <ul className="right-side2">
                <li className="navbar-item2">
                    <Link to="write" style={{ textDecoration: 'none',color:'black' }}>Write</Link>
                </li>
                <li className="navbar-item2" onClick={handlesignout}>SignOut {user && user.displayName}</li>
            </ul>
        </nav>
        <div className='main' id='main'>
            <div className='content'>
                {filter_topic==null?<Articles/>:<Articles2 topic={filter_topic}/>}
            </div>
            <div className='footer-content'>
                <Footer updateParentState={updateParentState}/>
            </div>
        </div>
        <Outlet/>
    </>
  )
}

export default Home