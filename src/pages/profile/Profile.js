import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useParams } from "react-router-dom";
import Axios from "axios"
import Post from "../../components/Post/Post";
import Update from "../../components/update/Update";
// import img from  "../../components/Post/uploads/naruto.jpg"
// import imf from "./uploads/naruto.jpg"

// import img from "../../../../server/images"

function Profile({}) {
  var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";
  console.log(imageBasePath)

  const {userId} = useContext(LoginContext);
  const {id} = useParams();
  // console.log(userId)
  // console.log(id)

  const [coverPic, setCoverPic] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("")
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState("");

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState("");

  const [follows, setFollows] = useState();


  const [openUpdate, setOpenUpdate] = useState(false);

  console.log(imageBasePath + profilePic)
  


  //get username
  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/getProfileDetails", {
      params: {id}
    }).then((response) => {
      console.log(response.data.message)
      setName(response.data.message[0].username)
      setCoverPic(response.data.message[0].coverPic);
      setProfilePic(response.data.message[0].profilePic)
    })
  }, [])


  //get users posts
  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/getUsersPosts", {
      params: {id}
    }).then((response) => {
      console.log(response);
      setPosts(response.data.message);
      setPostsCount(response.data.message.length);
    })
  }, [id])

  //get users follower count
  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/getUsersFollowers", {
      params: {id}
    }).then((response) => {
      console.log(response)
      setFollowers(response.data.message.length)
    })
  }, [id])


  //get users following count

  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/getUsersFollowing", {
      params: {id}
    }).then((response) => {
      console.log(response)
      setFollowing(response.data.message.length)
    })
  }, [id])

  //get users initial follow button data

  useEffect(() => {
    Axios.get("https://socialmedia-saif.herokuapp.com/checkFollowing", {
      params: {userId, id}
    }).then((response) => {
      // console.log(response)
      if(response.data.message.length > 0){
        setFollows(true)
      } else{
        setFollows(false)
      }
    })
  }, [id])



  async function handleFollow(e){
    // e.preventDefault()
    setFollows(!follows)
    // console.log(follows)



    {!follows
      ?
      Axios.post("https://socialmedia-saif.herokuapp.com/followUser", {
        followerUserId: userId,
        followingUserId: id
      }).then((response) => {
        // console.log(response)
      })
      :
      Axios.delete("https://socialmedia-saif.herokuapp.com/unfollowUser", {
        params: {userId, id}
      }).then((response) => {
        // console.log(response)
      })
    }

  }

  console.log(name)
  console.log(coverPic)
  console.log(profilePic)



  return (
    <div className="profile">
      <div className="images">
        {coverPic !== null && (
           <img
           src={imageBasePath + profilePic}
           // src=""
           alt=""
           className="cover"
         />
        )}

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
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
          <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            {/* <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a> */}
          </div>
          <div className="center">
            <span>{name}</span>
            <div className="info">
              {/* <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div> */}
            </div>
            {(userId == id) 
              ? 
              (
                <div className="profileData">
                  <h4>{postsCount} posts</h4>
                  <h4>{followers} Followers</h4>
                  <h4>{following} Following</h4>
                  <button onClick={() => setOpenUpdate(true)}>update</button>
                </div>
                
              )
              :
              (
                <div className="profileData">
                  <h4>{postsCount} posts</h4>
                  <h4>{followers} Followers</h4>
                  <h4>{following} Following</h4>

                  <button onClick={handleFollow}>
                  {(!follows)
                    ?
                    (
                      "Follow"
                    )
                    :
                    (
                      "Following"
                    )
                  }
                  </button>

                </div>
              )
            }

          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
      <div className='posts'>
      {posts.map(post=>{
        return <Post post={post} key={post.userId}/> 
      })}
    </div>

    {openUpdate && <Update setOpenUpdate={setOpenUpdate}/>}
    </div>
  )
}

export default Profile