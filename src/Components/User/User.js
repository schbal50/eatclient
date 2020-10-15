import React, { Component, useState, useEffect, useContext } from "react";
import UserService from "../../Services/UserService";
import { AuthContext } from "../../Context/AuthContext";
import Message from "../Message.js";
import axios from "axios";
import "./User.css";

function UserSettings() {
  const [thisUser, setThisUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const [Image, setImage] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);


   function fetchUserData() {
      UserService.getUserDetails().then((data) => {
      const { message } = data;
      if (!message.msgError) {
        setThisUser(data.user);

        var arrayBufferView = new Uint8Array( data.user.avatar.data );
        var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL( blob );
        setImage(imageUrl);
        

      } else if (message.msgBody === "UnAuthorized") {
        setMessage(message);
        authContext.setUser({ username: "", is_staff: false });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message); // Ez error message lesz
      }
    });

  }

  function imageHandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      if (e.target.files[0]) {
        //let res = axios.post("/user/logo", formData);
        UserService.postLogo(formData).then(data => {
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="background">
      <div className="card-container">
        <div className="user-container">
          <h2>User Settings</h2>
          <img src={Image} alt="" className="img"></img>
          <p>
            <b>Username:</b> {thisUser.username}
          </p>
          <p>
            <b>Email:</b> {thisUser.email}
          </p>
        </div>
        <div className="button-container">
          <button
            className="btn btn-lg btn-block"
            Style="background-color:#fdb863;"
          >
            Edit User
          </button>
        </div>

        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              enctype="multipart/form-data"
              type="file"
              name="profile-logo"
              id="input"
              accept="image/*"
              onChange={imageHandler}
            />
            <label>Choose file</label>
          </div>
        </div>
        
        
      </div>
    </div>
    
  );
}

export default UserSettings;
