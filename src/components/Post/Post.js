import React, { useState, useEffect, useContext } from 'react'
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import Axios from "axios"
import { LoginContext } from '../../contexts/LoginContext';
//  import image from "../../../public/images"


function Post({post}) {
  var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";

  const {userId, profilePic} = useContext(LoginContext);
  const id = post.userId;

  const [postProfilePic, setPostProfilePic] = useState("");

  const [commentOpen, setCommentOpen] = useState(false);
  const [liked, setLiked] = useState(false)

  const [likes, setLikes] = useState();
  const [comments, setComments] = useState("");
  const postId = post.id;

  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/getProfileDetails", {
      params: {id}
    }).then((response) => {
      // console.log(response.data.message)
      // setName(response.data.message[0].username)
      // setCoverPic(response.data.message[0].coverPic);
      setPostProfilePic(response.data.message[0].profilePic)
    })
  }, [])

  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/getLikes", {
      params: {postId}
    }).then((response) => {
      // console.log(response);
      setLikes(response.data.message.length)
      // setComments(response.data.message.comments)
    })
  })

  // console.log(likes)

  async function updateLikes(e){
    setLiked(!liked);

    console.log(liked)

    {!liked ?
      Axios.post("https://socialmedia-saif.herokuapp.com/addLike", {
        userId: userId,
        postId: postId
      }).then((response) => {
        // setLikes(likes => likes + 1)
      }) :
      Axios.delete("https://socialmedia-saif.herokuapp.com/deleteLike", {
        params: {userId, postId}
      }).then((response) => {
        console.log(response)
        // setLikes(likes => likes - 1)
      })
    }

    // if(!liked){
     
    // } else if(liked){
    //   Axios.delete("https://socialmedia-saif.herokuapp.com/deleteLike", {
    //     params: {userId, postId}
    //   }).then((response) => {
    //     console.log(response)
    //     // setLikes(likes => likes - 1)
    //   })
    // }

    // console.log(likes)
  }

  // console.log("../../../public/images/" + post.img);



  return (
    <div className='post'>
      <div className='container'>
        <div className='user'>
          <div className='userInfo'>
            {postProfilePic !== null && (
            <img
            src={imageBasePath + postProfilePic}
            // src=""
            alt=""
            className="profile"
          />
          )}
              <div className='details'>
                <Link to={`/home/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                  <span className='name'>{post.name}</span>
                </Link>
                <span className='date'>1 min ago</span>
              </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className='content'>
          <p>{post.description}</p>
          {/* <img src={require(`/uploads/${post.img}`)} /> */}
          {post.img !== null &&
          (
            <img src={imageBasePath + post.img} />
          ) 

          }
        
          {/* src\uploads\image_1683923623335.png */}
        </div>
        <div className='info'>
          <div className='item' onClick={updateLikes}>
            {liked ? <FavoriteOutlinedIcon style={{ color: "red" }}/> : <FavoriteBorderOutlinedIcon/> }
            {likes} Likes
          </div>
          <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {comments} comments
          </div>
          {/* <div className='item'>
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>

    </div>
  )
}

export default Post