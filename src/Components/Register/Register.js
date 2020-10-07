import { useScrollTrigger } from '@material-ui/core'
import React, { useState, useRef, useEffect } from 'react'
import AuthService from '../../Services/AuthService'
import Message from '../Message' // Displays the messages that we get from the server.

import './Register.css'

const Register = props => {
    const [user, setUser] = useState({ username: "", password: "", email: "" });
    const [passwordAgain, setPasswordAgain] = useState({ passwordAgain: ""})
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, [])

    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onChangePasswordValidate = e => {
        e.preventDefault();
        setPasswordAgain({ passwordAgain: e.target.value })
        
    }

    const resetForm = () => {
        setUser({ username: "", password: "", email: "" })
        setPasswordAgain({passwordAgain: ""})
    }

    const onSubmit = e => {
        e.preventDefault();
        if ( passwordAgain.passwordAgain !== user.password ) {
            setMessage({ msgBody: "Password and password again does not match", msgError: true });
            console.log(passwordAgain.passwordAgain)
            console.log(user.password)
            return
        }
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) { // megmutatjuk az üzenetet, ha sikeres és 2mp után átdobjuk a login pagera.
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000)
            }
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Register Here</h5>
                            <form className="form-signin" onSubmit={onSubmit}>

                                <div className="form-label-group">
                                    <input type="text" id="email" name="email" className="form-control" placeholder="Email address" onChange={onChange} required autofocus />
                                    <label for="email">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="text" id="username" name="username" className="form-control" placeholder="Username" onChange={onChange} required autofocus />
                                    <label for="username">Username</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="password" name="password" className="form-control" placeholder="Password" onChange={onChange} required autofocus />
                                    <label for="password">Password</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="passwordAgain" name="passwordAgain" className="form-control" placeholder="Password again" onChange={onChangePasswordValidate} autofocus />
                                    <label for="passwordAgain">Password again</label>
                                </div>


                                <button className="btn btn-lg btn-block" Style="background-color:bisque; opacity:70%;" type="submit">Register</button>
                            </form>
                        </div>
                        {message ? <Message message={message} /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register
