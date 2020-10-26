import React, { useState, useContext, useEffect } from 'react'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AuthContext } from '../../Context/AuthContext'
import leves from '../../pics/leves.jpg';
import Paginator from './Paginator/Paginator'
import AddItem from './AddItem/AddItem'
import MenuService from '../../Services/MenuService'
import Message from '../Message.js'
import "./Menus.css"

export default function Menu() {
    const [menuItem, setMenu] = useState({ name: "", description: "", price: "" })
    const [selectedMenu, setSelectedMenu] = useState({ name: "", description: "", price: "" })
    const [menu, setMenus] = useState([]);
    const authContext = useContext(AuthContext);
    const [isAddModal, setIsAddModal] = useState(false);
    const [url, setUrl] = useState("");
    const [message, setMessage] = useState(null);
    const [toCreate, setToCreate] = useState(false);

    useEffect(() => {
        MenuService.getMenus().then(data => {
            setMenus(data.menu)
        })
        // const uid = authContext.user.username;
        // setUrl(`http://localhost:3000/publicmenu?id=${uid}`);
    }, [isAddModal]);

const onAddHandler = () => {
    setSelectedMenu({
        name: "", description: "", price: ""
    });
    setIsAddModal(!isAddModal);
    setToCreate(true);
}

const setAddItemNone = () => {
    setIsAddModal(false);
}

function deleteItem(id) {
    MenuService.deleteMenuItemById(id).then(data => {
        const { message } = data;
        if (!message.msgError) {
            setMenus(data.menu);
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

function updateItem(id) {
    setToCreate(false);
    setSelectedMenu(menu.find(x => x._id === id));
    setIsAddModal(!isAddModal);
}

const onUpdate = (e, menuItem) =>{
    e.preventDefault();
    console.log(menuItem);
    setSelectedMenu(x => (x.name = menuItem.name, x.price = menuItem.price, x.description = menuItem.description));
    console.log(selectedMenu);
    MenuService.updateMenuItemById(selectedMenu._id, menuItem).then(data => {
        const { message } = data;
        //resetForm();
        if (!message.msgError) {
            MenuService.getMenus().then(getData => {
                setMenus(getData.menu);
                setMessage(message);
            })
        }
        else if (message.msgBody === "UnAuthorized") {
            setMessage(message);
            authContext.setUser({ username: "", is_staff: false })
            authContext.setIsAuthenticated(false);
        }
        else {
            setMessage(message); // Ez error message lesz
        }
    });
}

const onSubmit = (e, formData) => {
    e.preventDefault();
    MenuService.postMenu(formData).then(data => {
        const { message } = data;
        //resetForm();
        if (!message.msgError) {
            MenuService.getMenus().then(getData => {
                setMenus(getData.menu);
                setMessage(message);
            })
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

function getUrl(picture) {
    if (picture) {
        var arrayBufferView = new Uint8Array( picture.data );
        var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL( blob );
        return imageUrl;
    }
    return leves;
}

var modal = document.getElementById("myModal");

return (
    <>
        <AddItem disabled={isAddModal} onExit={onAddHandler} onSave={toCreate ? onSubmit : onUpdate} selectedItem={selectedMenu} />
        <div className="paginator-container">
            <div className="paginator-insideContainer"><Paginator /></div>
            <div className="addLi" id="addList" onClick={() => onAddHandler()}>
                <AddCircleOutlineIcon fontSize="large" />
            </div>
        </div>
        <div className="menus-container">
            <ul className="menus-list">
                {menu.map((menuI, idx) => {
                    return <div key={idx}>
                        <li>
                            <div className="item1">
                                <h2 className="name">{menuI.name}</h2>
                                <p className="description">{menuI.description}</p>
                                <h3 className="price">{menuI.price} Ft</h3>
                                <div className="icon">
                                    <DeleteOutlineRoundedIcon type="button" fontSize="small" onClick={() => { deleteItem(menuI._id) }} />
                                    <EditRoundedIcon fontSize="small" type="button" onClick={() => updateItem(menuI._id)} />
                                </div>
                            </div>
                            <div className="item2">
                                <img src={getUrl(menuI.picture)} className="sizedImage" alt="Responsive image" />
                            </div>
                        </li>
                    </div>
                })}
            </ul>
        </div>
        {/* {message ? <Message message={message} /> : null} */}
    </>
)
}
