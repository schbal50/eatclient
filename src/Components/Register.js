import React, { useState, useRef, useEffect } from 'react'
import AuthService from '../Services/AuthService'
import Message from '../Components/Message' // Displays the messages that we get from the server.

const Register = props => {
    const [user, setUser] = useState({ username: "", password: "", email: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=> {
        return () => {
            clearTimeout(timerID);
        }
    }, [])

    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const resetForm = () => {
        setUser({ username: "", password: "", email: "" })
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError) { // megmutatjuk az üzenetet, ha sikeres és 2mp után átdobjuk a login pagera.
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000)
            }
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Register here</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <div className="d-flex flex-column bd-highlight mb-3">
                    <input value={user.username} type="text" name="username" onChange={onChange} className="form-contol" placeholder="Enter username" />
                    <input value={user.password} type="password" name="password" onChange={onChange} className="form-contol" placeholder="Enter password" />
                    <input value={user.email} type="text" name="email" onChange={onChange} className="form-contol" placeholder="Enter email" />
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    );
}

export default Register
