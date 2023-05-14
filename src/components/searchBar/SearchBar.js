import { useState, useEffect } from 'react'
import "../searchBar/searchBar.scss"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

function SearchBar() {
    const [users, setUsers] = useState([])

    const [filteredData, setFilteredData] = useState([]);
    const [searchedWordEntered, setSearchedWordEntered] = useState()
    const [searchedUserId, setSearchedUserId] = useState();

    useEffect(() => {
        Axios.get("https://socialmedia-saif.herokuapp.com/getAllUsers").then((response) => {
            // console.log(response)
            setUsers(response.data.message)
        })
    }, [])

    console.log(users);

    const handleFilter = (e) => {
        e.preventDefault();
        const wordEntered = e.target.value;
        // setWordEntered(e.target.value)

        const newFilter = users.filter((user) => {
            return user.username.toLowerCase().includes(wordEntered.toLowerCase());
        })

        if(wordEntered === ""){
            setFilteredData([]);
        } else{
            setFilteredData(newFilter);
        }

        setSearchedWordEntered(wordEntered)

        // return wordEntered

    }

    const navigate = useNavigate();



        
        async function findUser(userId){
            // console.log(username);
            // Axios.get("https://socialmedia-saif.herokuapp.com/getUserByUsername", {
            //     params: {username}
            // }).then((response) => {
            //     console.log(response)
            //     setSearchedUserId(response.data.message[0].userId)
            // })
            
            navigate(`/home/profile/${userId}`)
        }

   


  return (
    <div className='search'>
        <div className='searchInput'>
            <SearchOutlinedIcon />
            <input type='text' placeholder='Enter a username' onChange={handleFilter}/>
        </div>
        {filteredData.length !=0 &&
        (
            <div className='dataResult'>
            {filteredData.slice(0, 8).map((user, key) => {
                // return <Link to={`/profile/${user.userId}`} className='userItem'>{user.username}</Link>
                return <p onClick={() => findUser(user.userId)}>{user.username}</p>
            })}
            {/* <p>test</p> */}
        </div>
        )
        }
    </div>
  )
}

export default SearchBar