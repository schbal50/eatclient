import React, { useState, useContext, useEffect } from 'react'
import MenuItem from './MenuItem'
import MenuService from '../Services/MenuService';
import { AuthContext } from '../Context/AuthContext'
import Message from '../Components/Message'
import QRCode from 'qrcode.react';
import { useHistory } from 'react-router-dom'
// https://github.com/soldair/node-qrcode
// http://localhost:3000/publicmenu?id=5f4fae1f3cd24d69148068f6

import './Menus/Menus.css';

export default function Menus() {
    const [menuItem, setMenu] = useState({ name: "" })
    const [menu, setMenus] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    const [url, setUrl] = useState("");

    useEffect(() => {
        MenuService.getMenus().then(data => {
            setMenus(data.menu)
        })

        setUrl("http://localhost:3000/publicmenu?id=" + `${authContext.user._id}`)
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        MenuService.postMenu(menuItem).then(data => {
            const { message } = data;
            resetForm();
            if (!message.msgError) {
                MenuService.getMenus().then(getData => {
                    setMenus(getData.menu);
                    setMessage(message);
                })
            }
            else if (message.msgBody === "UnAuthorized") {
                setMessage(message);
                authContext.setUser({ username: "", role: "" })
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message); // Ez error message lesz
            }
        })
    }

    const onChange = (e) => {
        setMenu({ name: e.target.value });
    }

    const resetForm = () => {
        setMenu({ name: "" })
    }

    const downloadQR = () => {
        var canvas = document.getElementsByTagName('canvas')[0];
        var img = canvas.toDataURL("image/png");
        document.write('<img src="' + img + '"/>');
    }

    return (
        <div className="container">

            <ul className="list-group">
                {
                    menu.map(menuI => {
                        return <MenuItem key={menuI._id} menuItem={menuI} />
                    })
                }
            </ul>
            <br></br>
            <form onSubmit={onSubmit}>
                <label htmlFor="menu">Enter menu</label>
                <input type="text" name="menu" value={menuItem.name} onChange={onChange} className="form-contol" placeholder="Enter any menu item" />
                <button className="btn btn-lg btn-primary btn-block" type="submit" >Submit</button>
            </form>
            {message ? <Message message={message} /> : null}
            <div className="container">
                <a onClick={downloadQR}>
                    <QRCode
                        value={url}
                    />
                </a>
            </div>
        </div>
    )
}
