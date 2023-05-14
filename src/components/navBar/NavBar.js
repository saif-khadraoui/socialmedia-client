import React from 'react'
import "./navBar.scss"
import { useState, useEffect, useContext } from "react";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from 'react-router-dom';
import Axios from "axios";
import { LoginContext } from '../../contexts/LoginContext';
import SearchBar from '../searchBar/SearchBar';

function NavBar() {

  var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
  const {savedUsername, savedName, setSavedName, profilePic, userId, setProfilePic, coverPic} = useContext(LoginContext);


  const id = userId

  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/getProfileDetails", {
      params: {id}
    }).then((response) => {
      console.log(response.data.message)
      // setName(response.data.message[0].username)
      // setCoverPic(response.data.message[0].coverPic);
      setProfilePic(response.data.message[0].profilePic)
    })
  }, [])
  

  console.log(imageBasePath + profilePic)

//   const [imgSrc, setImgSrc] = useState("");
// const [fallback, setFallback] = useState(false);

// useEffect(() => {
//   if(`imageBasePath${profilePic}`){
//     setImgSrc(`imageBasePath${profilePic}`);
//   }
// },[`imageBasePath${profilePic}`])

//   const reloadSrc = e => { 
//     if(fallback){
//       e.target.src = `imageBasePath${profilePic}`;
//     }else{
//       e.target.src = imgSrc
//       setFallback(true)
//     }
//   }


  return (
    <div className='navBar'>
      <div className='left'>
        <Link to="" style={{ textDecoration: "none" }}>
          <span>socialmedia</span>
        </Link>
        <HomeOutlinedIcon />
          {/* <DarkModeOutlinedIcon /> */}
          <GridViewOutlinedIcon />
          <div className='search'>
            <SearchBar />
            {/* <SearchOutlinedIcon />
            <input type='text' placeholder='search' /> */}
          </div>
      </div>
      <div className='right'>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className='user'>
          <Link to={`/home/profile/${userId}`}>
          {profilePic !== null ? (
            <img
            src={imageBasePath + profilePic}
            // src=""
            alt=""
            className="profilePic"
          />
        ): (
          <img
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
          // src=""
          alt=""
          className="profilePic"
        />
        )}
            <span>{savedName}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar