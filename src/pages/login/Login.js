import "./login.scss";
import { useState, useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import Axios from "axios";
import { LoginContext } from "../../contexts/LoginContext";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {savedUsername, setSavedUsername, savedName, setSavedName, setProfilePic, setCoverPic, userId, setUserId} = useContext(LoginContext);

  async function attemptLogin(e){
    e.preventDefault();

    Axios.post("https://socialmedia-saif.herokuapp.com/login", {
      username: username,
      password: password
    }).then((response) => {
      console.log(response)
      if(response.data.message.length > 0){
        alert("logged in")
        navigate("/home")
        setSavedUsername(response.data.message[0].username);
        setSavedName(response.data.message[0].name)
        setProfilePic(response.data.message[0].profilePic)
        setCoverPic(response.data.message[0].coverPic)
        setUserId(response.data.message[0].userId)
        // localStorage.setItem("userId", userId)

      }
    })
  }



  return (
    <div className="login">
        <div className="card">
            <div className="left">
                <h1>Hello World.</h1>
                <p>lorem ipsum</p>
                <span>Don't have an account?</span>
                <Link to="/register"><button>Register</button></Link>
            </div>
            <div className="right">
              <form>
              <h1>Login</h1>
                <input placeholder="Username" type="text" value={username} onChange={((e) =>{setUsername(e.target.value)})}/>
                <input placeholder="Password" type="password" value={password} onChange={((e) =>{setPassword(e.target.value)})}/>
                <button onClick={attemptLogin}>Login</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default Login