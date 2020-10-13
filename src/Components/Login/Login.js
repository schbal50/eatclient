import React, { useState, useContext } from 'react'
import AuthService from '../../Services/AuthService'
import Message from '../Message' // Displays the messages that we get from the server.
import { AuthContext } from '../../Context/AuthContext';

import "./Login.css"

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                console.log(user);
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/menus');
            }
            else {
                console.log(data)
                setMessage(message);
            }
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Login</h5>
                            <form className="form-signin" onSubmit={onSubmit}>

                                <div className="form-label-group">
                                    <input type="text" id="username" name="username" className="form-control" placeholder="Username" onChange={onChange} required autofocus />
                                    <label for="username">Username</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="password" name="password" className="form-control" placeholder="Password" onChange={onChange} required autofocus />
                                    <label for="password">Password</label>
                                </div>

                                <button className="btn btn-lg btn-block" type="submit" Style="background-color:bisque; opacity:70%;">Log In</button>
                            </form>
                            {message ? <Message message={message} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
