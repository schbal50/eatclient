import React from 'react'

import './MenuItem/MenuItem.css'

export default function MenuItem(props) {

    function renderIfHasValue(value){
        if (value) {
            return <li>value</li>
        }
    }

    return (
        <div className="note">
            <h1>{props.menuItem.name}</h1>
            <p className=".note-descripiton">{renderIfHasValue(props.menuItem.description)}</p>
            <p className="" >{renderIfHasValue(props.menuItem.price)}</p>
            <p className="" >{renderIfHasValue(props.menuItem.categories)}</p>
        </div>
    )
}
