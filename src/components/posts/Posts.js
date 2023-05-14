import { useState, useEffect, useContext } from 'react'
import "./posts.scss"
import Post from '../Post/Post';
import Axios from "axios"
import { LoginContext } from '../../contexts/LoginContext';

function Posts() {

  const {userId, profilePic, coverPic} = useContext(LoginContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // console.log("works")
    Axios.get("https://socialmedia-saif.herokuapp.com/getPosts", {
      params: {userId}
    }).then((response) => {
      // console.log(response.data.message)
      setPosts(response.data.message)
      
    })
  })

  // console.log(profilePic)
  // console.log(coverPic)




  return (
    <div className='posts'>
      {/* <button onClick={test}>try</button> */}
      {posts.slice(0).reverse().map(post=>{
        return <Post post={post} key={post.userId}/> 
      })}
    </div>
  )
}

export default Posts