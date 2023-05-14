import React, { useState, useEffect, useContext } from 'react'
import "./stories.scss";
import Axios from "axios"
import AddStory from '../addStory/AddStory';
import { LoginContext } from '../../contexts/LoginContext';

function Stories() {
 
  var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
  const [showAddStory, setShowAddStory] = useState(false);
  const [stories, setStories] = useState([])

  const {savedName, profilePic} = useContext(LoginContext);


  //get stories
  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/getStories").then((response) => {
      // console.log(response.data.message)
      setStories(response.data.message);
    })
  }, [stories])

  return (
    <div className='stories'>
        <div className='story'>
        {/* {profilePic !== null ? (
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
        )} */}
          <span>saif khadraoui</span>
          <button onClick={(() => setShowAddStory(true))}>+</button>
        </div>
      {stories.map(story=>(
        <div className='story'>
          <img src={imageBasePath + story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}

      {showAddStory && <AddStory setShowAddStory={setShowAddStory}/>}
      {/* <AddStory setShowAddStory={setShowAddStory}/> */}
    </div>
  )
}

export default Stories