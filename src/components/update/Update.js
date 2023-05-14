import React, { useState, useEffect, useContext } from 'react'
import "../update/update.scss"
import Axios from 'axios';
import { LoginContext } from '../../contexts/LoginContext';

function Update({setOpenUpdate}) {

    const [profileFile, setProfileFile] = useState();
    const [coverFile, setCoverFile] = useState();

    const [userUpdated, setUserUpdate] = useState(false);

    const {userId, setProfilePic, setCoverPic} = useContext(LoginContext);

    const handleProfileFile = (e) => {
        setProfileFile(e.target.files[0])
      }

      
    const handleCoverFile = (e) => {
        setCoverFile(e.target.files[0])
      }

    
    const updateUser = (e) => {
        console.log(profileFile)
        console.log(coverFile)
        const formData = new FormData();
        formData.append("images", profileFile);
        formData.append("images", coverFile);
        formData.append("userId", userId)

        Axios.put("https://socialmedia-saif.herokuapp.com/updateUser", formData).then((response) => {
            console.log(response)

            setProfilePic(profileFile.name)
            setCoverPic(coverFile.name)
        })

    }

    // console.log(profileP)


  return (
    <div className='update'>
        <div className='updateImages'>
            <div className='updateItem'>
                <h4>Change profile image</h4>
                <input
                type="file"
                id="file"
                // style={{ display: "none" }}
                onChange={handleProfileFile}
                />
            </div>
            <div className='updateItem'>
                <h4>Change cover image</h4>
                <input
                type="file"
                id="file"
                // style={{ display: "none" }}
                onChange={handleCoverFile}
                />
            </div>
        </div>
        <button className='updateUser' onClick={updateUser}>Update</button>
        <button className="closeButton"onClick={() => setOpenUpdate(false)}>close</button>
    </div>
  )
}

export default Update