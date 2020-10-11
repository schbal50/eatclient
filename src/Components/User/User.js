import React from 'react'
import "./User.css"

function UserSettings(currentUser) {
    const user = { username: "Test", password: "Test1", email: "Test1@gmail.com" };

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
                    <p><b>Username:</b> {user.username}</p>
                    <p><b>Password:</b> {user.password}</p>
                    <p><b>Email:</b> {user.email}</p>
                </div>
                <div className="button-container">
                    <button className="btn btn-lg btn-block" Style="background-color:#fdb863;">Edit User</button>
                </div>
            </div>
        </div>
    )
}

export default UserSettings