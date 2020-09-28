import React, { useState, useEffect } from 'react'
import { Dialog } from '@material-ui/core';
import "./AddItem.css"


export default function AddItem({ disabled, onExit, onSave }) {
    const [menuItem, setMenuItem] = useState({
        name: "", description: "", price: "", categories: []
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setMenuItem((prevItem) => {
            return {
                ...prevItem,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if (disabled) {
            var modal = document.getElementById("myModal");
            modal.style.display = "flex";
        }
        else {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        }

    }, [disabled])

    const exitModalHandler = (e) => {
        e.preventDefault();
        onExit();
    }

    const onSubmitModal = e => {
        e.preventDefault();
        onSave(e, menuItem);
        clearMenuItemState();
        onExit();
    }

    const clearMenuItemState = () => {
        setMenuItem({
            name: "", description: "", price: "", categories: []
        })
    }

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <div className="form-container-1">
                    <form id="useForm" className="addForm" onSubmit={onSubmitModal}>
                        <input name="name" type="text" value={menuItem.name} onChange={handleChange} placeholder="Name"></input>
                        {/* Több soros description kéne*/}
                        <input name="price" type="number" value={menuItem.price} onChange={handleChange} placeholder="Price"></input>
                        <input name="categories" type="text" value={menuItem.categories} onChange={handleChange} placeholder="Categorie"></input>

                    </form>
                    <textarea rows="4" cols="50" name="description" form="useForm" value={menuItem.description} onChange={handleChange} placeholder="Description">Description</textarea>
                    <div className="buttonContainer">
                        <button type='submit' form="useForm" >Submit</button>
                        <button type="button" form="useForm" onClick={exitModalHandler}>X</button>
                    </div>
                </div>
                <div className="form-container-2">
                    <img src="https://speedtest.unitymedia.de/img/icons/upload.svg" className="sizedImage" alt="Responsive image" type="button"/>
                </div>
            </div>
        </div>
    )
}
