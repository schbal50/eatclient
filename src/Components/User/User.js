import React, {useState, useEffect, useContext} from 'react'
import UserService from '../../Services/UserService'
import { AuthContext } from '../../Context/AuthContext'
import Message from '../Message.js'
import "./User.css"

function UserSettings(currentUser) {
    const [thisUser, setThisUser] = useState( {username: "", password: "", email: ""} );
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetchUserData();
    }, [])

    function fetchUserData () {
        UserService.getUserDetails().then(data  => {
            const {message} = data;
            if (!message.msgError) {
                console.log(data.user)
                setThisUser(data.user);
            }
            else if (message.msgBody === "UnAuthorized") {
                setMessage(message);
                authContext.setUser({ username: "", is_staff: false })
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message); // Ez error message lesz
            }
        })
    }
    /*useEffect(() => {
        setUser({name: currentUser.username, password: currentUser.password, email: currentUser.email});
        if (disabled) {
            var modal = document.getElementById("myModal");
            modal.style.display = "flex";
        }
        else {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        }

    }, [disabled])*/



    return (
        <div className="background">
            <div className="card-container">
                <div className="user-container">
                    <h2>User Settings</h2>
                    <p><b>Username:</b> {thisUser.username}</p>
                    <p><b>Email:</b> {thisUser.email}</p>
                </div>
                <div className="button-container">
                    <button className="btn btn-lg btn-block" Style="background-color:#fdb863;">Edit User</button>
                </div>
            </div>
        </div>
    )
}

export default UserSettings