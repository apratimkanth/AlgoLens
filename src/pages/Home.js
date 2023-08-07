import React from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom';
import "../style/home.css";
import { auth } from '../firebaseConfig';
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Articles from '../components/Articles';


function Home() {
    let navigate = useNavigate();
    const [user] = useAuthState(auth);
    const handlesignout=()=>{
        signOut(auth);
        navigate("/");
    }
  return (
    <>
        <nav className="navbar2">
            <div className="left-side2">
                <div className="navbar-logo2">
                <Link to="/" style={{ textDecoration: 'none',color:'black' }}>Logo</Link>
                </div>
                <div className="search-bar2">
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <ul className="right-side2">
                <li className="navbar-item2">
                    <Link to="write" style={{ textDecoration: 'none',color:'black' }}>Write</Link>
                </li>
                <li className="navbar-item2" onClick={handlesignout}>SignOut {user && user.displayName}</li>
            </ul>
        </nav>
        <Articles/>
        <Outlet/>
    </>
  )
}

export default Home