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
import Contact from './components/Contact';
import Article from './components/Article';
import Temp from './components/Temp';

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
        {/* <Route path="/:topic" element={<Landing2/>} /> */}
        <Route path="/home">
          <Route index element={<RequiredAuth>{<Home/>}</RequiredAuth>}/>
          <Route path="write" element={<Write/>}/>
        </Route>
        {/* <Route path="/article/:id" element={<Article/>} /> */}
        <Route path="/article/:id" element={<Temp/>} />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </Router>
  );
}

export default App;
