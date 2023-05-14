import React, { useContext, useState } from 'react'
import "../addStory/addStory.scss"
import Axios from "axios"
import { LoginContext } from '../../contexts/LoginContext';

function AddStory({ setShowAddStory }) {
    const [file, setFile] = useState();

    const {userId, savedName} = useContext(LoginContext);

    const handleFile = (e) => {
        setFile(e.target.files[0])
      }

    const addStory = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", userId);
        formData.append("savedName", savedName)

        Axios.post("https://socialmedia-saif.herokuapp.com/addStory", formData).then((response) => {
            console.log(response);
        })
    }
    

  return (
    <div className='addStory'>
        <div className='addStoryImage'>
        <input
              type="file"
              id="file"
            //   style={{ display: "none" }}
              onChange={handleFile}
            />
        </div>
        <button className='addStoryButton' onClick={addStory}>Add</button>
        <button className='closeButton' onClick={(() => setShowAddStory(false))}>close</button>
    </div>
  )
}

export default AddStory