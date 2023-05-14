import React from 'react'
import "./leftBar.scss";
import { useContext, useEffect } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import Axios from "axios"
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";

function LeftBar() {

  var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
  const {savedUsername, savedName, setSavedName, profilePic} = useContext(LoginContext);
  



  return (
    <div className='leftBar'>
      <div className='container'>
        <div className='menu'>
          <div className='user'>
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
          </div>
          <div className="item">
            <img src={Friends} alt="icon" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="icon" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="icon" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="icon" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="icon" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className='menu'>
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Friends} alt="icon" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="icon" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="icon" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="icon" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="icon" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className='menu'>
          <span>Others</span>
          <div className="item">
            <img src={Market} alt="icon" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="icon" />
            <span>Watch</span>
          </div>
          {/* <div className="item">
            <img src={"Memories"} alt="icon" />
            <span>Memories</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default LeftBar