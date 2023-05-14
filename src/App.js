import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {BrowserRouter as Router, Routes, Route, Outlet, Navigate} from "react-router-dom"
import NavBar from './components/navBar/NavBar';
import LeftBar from './components/leftBar/LeftBar';
import RightBar from './components/rightBar/RightBar';
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import "./style.scss";
import { creatContent, useEffect, useState } from "react";
import { LoginContext } from './contexts/LoginContext';


function App() {
  const currentUser = true;


  const Layout = () => {
    return(
      <div className='theme-dark'>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{flex: 6}}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    )
  }

  const [savedUsername, setSavedUsername] = useState("");
  const [savedName, setSavedName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("")
  const [userId, setUserId] = useState("");


  return (
    <div>
      <LoginContext.Provider value={{savedUsername, setSavedUsername, savedName, setSavedName, profilePic, setProfilePic, coverPic, setCoverPic, userId, setUserId}}>
        <Router>
          <Routes>
            <Route path="/" index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Layout />}>
              <Route path="/home" index element={<Home />} />
              <Route path="/home/profile/:id" element={<Profile />} />
            </Route>
          
          </Routes>
        </Router>
      </LoginContext.Provider>

    </div>
  );
}

export default App;
