import React from 'react'
import "./comments.scss"
import { useState, useEffect, useContext } from "react";
import Axios from 'axios';
import { LoginContext } from '../../contexts/LoginContext';

function Comments({postId}) {

  
  var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
  const {userId, savedName, profilePic} = useContext(LoginContext);

    const [comments, setComments] = useState([])

    const [description, setDescription] = useState("");

    useEffect(() => {
      Axios.get("https://socialmedia-saif.herokuapp.com/getComments", {
        params: {postId}
      }).then((response) => {
        setComments(response.data.message)
      })
    }, [comments])


    async function addComment(e){
      e.preventDefault();
      Axios.post("https://socialmedia-saif.herokuapp.com/addComment", {
        description: description,
        userId: userId,
        postId: postId,
        name: savedName
      }).then((response) => {
        console.log(response)
      })
    }

  return (
    <div className='comments'>
        <div className='write'>
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
            <input type="text" placeholder="write a comment" onChange={((e) => {setDescription(e.target.value)})}/>
            <button onClick={addComment}>Send</button>
        </div>
        {comments.map(comment=> (
            <div className='comment'>
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
                <div className='info'>
                    <span>{comment.name}</span>
                    <p>{comment.description}</p>
                </div>
                <span className='date'>1 hour ago</span>
            </div>
        ))}
    </div>
  )
}

export default Comments