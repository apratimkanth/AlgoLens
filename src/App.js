import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Landing from './pages/Landing';
import Home from './pages/Home';
import Footer from './pages/Footer';
import About from './components/About';
import Write from './components/Write';
import Signin from './pages/Signin';
import Register from './pages/Register';
import { auth } from "./firebaseConfig";
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";




function App() {
  // const [isAuth,setAuth]=useState(false);
  // const [user] = useAuthState(auth);
  const RequiredAuth=({children})=>{
    const [user] = useAuthState(auth);
    console.log(user);
    return user?children:<Navigate to="/"/>;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home">
          <Route index element={<RequiredAuth>{<Home/>}</RequiredAuth>}/>
          <Route path="write" element={<Write/>}/>
        </Route>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
