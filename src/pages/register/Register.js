import "./register.scss";
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom"
import Axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  async function registerUser(event){
    event.preventDefault();
    console.log("works")

    Axios.get("https://socialmedia-saif.herokuapp.com/checkUserExists", {
      params: {username}
    }).then((response) => {
      console.log(response.data.message.length)
      if(response.data.message.length == 0){
          Axios.post("https://socialmedia-saif.herokuapp.com/register", {
        username: username,
        email: email,
        password: password,
        name: name
      }).then((response) => {
          navigate("/")
      })
      } else{
        alert("user already exists")
      }
    })



    
  }


  return (
    <div>
         <div className="register">
        <div className="card">
            <div className="left">
                <h1>socialmedia</h1>
                <p>lorem ipsum</p>
                <span>Do you have an account?</span>
                <Link to="/login"><button>Login</button></Link>
            </div>
            <div className="right">
              <form>
                <h1>Register</h1>
                  <input placeholder="Username" type="text" value={username} onChange={((e) =>{setUsername(e.target.value)})}/>
                  <input placeholder="Email" type="text" value={email} onChange={((e) =>{setEmail(e.target.value)})}/>
                  <input placeholder="Password" type="password" value={password} onChange={((e) =>{setPassword(e.target.value)})}/>
                  <input placeholder="Name" type="text" value={name} onChange={((e) =>{setName(e.target.value)})}/>
                  <button onClick={registerUser}>Register</button>
              </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Register