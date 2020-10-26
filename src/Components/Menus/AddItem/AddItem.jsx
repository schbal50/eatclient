import React, { useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import "./AddItem.css";

export default function AddItem({ disabled, onExit, onSave, selectedItem }) {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
  });
  const [formData, setFormData] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setMenuItem((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setFormData(new FormData());
    setMenuItem({
      name: selectedItem.name,
      description: selectedItem.description,
      price: selectedItem.price,
      picture: selectedItem.picture
    });
    if (disabled) {
      var modal = document.getElementById("myModal");
      modal.style.display = "flex";
    } else {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
  }, [disabled]);

  function getUrl(picture) {
    if (picture) {
        var arrayBufferView = new Uint8Array( picture.data );
        var blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL( blob );
        return imageUrl;
    }
    return "https://speedtest.unitymedia.de/img/icons/upload.svg";
}

  const exitModalHandler = (e) => {
    clearMenuItemState();
    e.preventDefault();
    onExit();
  };

  const imageHandler = (e) => {
    e.preventDefault();
    formData.append("picture", e.target.files[0]);
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    formData.append("name", menuItem.name);
    formData.append("description", menuItem.description);
    formData.append("price", menuItem.price);
    formData.append("categories", menuItem.categories);

    onSave(e, formData);
    clearMenuItemState();
    onExit();
  };

  const clearMenuItemState = () => {
    setMenuItem({
      name: "",
      description: "",
      price: "",
      categories: [],
    });
  };
  

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="form-container-1">
          <form id="useForm" className="addForm" onSubmit={onSubmitModal}>
            <input
              name="name"
              type="text"
              value={menuItem.name}
              onChange={handleChange}
              placeholder="Name"
            ></input>
            {/* Több soros description kéne*/}
            <input
              name="price"
              type="number"
              value={menuItem.price}
              onChange={handleChange}
              placeholder="Price"
            ></input>
            <input
              name="categories"
              type="text"
              value={menuItem.categories}
              onChange={handleChange}
              placeholder="Categorie"
            ></input>
          </form>
          <textarea
            rows="4"
            cols="50"
            name="description"
            form="useForm"
            value={menuItem.description}
            onChange={handleChange}
            placeholder="Description"
          >
            Description
          </textarea>
          <div className="buttonContainer">
            <button type="submit" form="useForm">
              Submit
            </button>
            <button type="button" form="useForm" onClick={exitModalHandler}>
              X
            </button>
          </div>
        </div>
        <div className="form-container-2">

          <img
            src={getUrl(menuItem.picture)}
            className="sizedImage"
            alt="Responsive image"
            type="button"
          />

          <div className="custom-file">
            <input
              enctype="multipart/form-data"
              type="file"
              name="profile-logo"
              id="input"
              accept="image/*"
              onChange={imageHandler}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
