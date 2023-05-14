import { useContext, useState } from 'react'
import "../share/share.scss"
import Axios from "axios";
import { LoginContext } from '../../contexts/LoginContext';

function Share() {

  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  var imageBasePath = window.location.protocol + "//" + window.location.host + "/images/";

  const {userId, setUserId, savedName, profilePic} = useContext(LoginContext);

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  async function attemptSharePost(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description)
    formData.append("userId", userId)
    formData.append("name", savedName)

    console.log(formData)

    Axios.post("https://socialmedia-saif.herokuapp.com/addPost", formData).then((response) => {
      console.log(response)
    })
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
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
            <input
              type="text"
              placeholder={`What's on your mind `}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="right">
            {/* {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )} */}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            <label htmlFor="file">
              <div className="item">
                <img src="" alt="" />
                <span>Add Image</span>
              </div>
            </label>
            {/* <div className="item">
              <img src="" alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src="" alt="" />
              <span>Tag Friends</span>
            </div> */}
          </div>
          <div className="right">
            <button onClick={attemptSharePost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share