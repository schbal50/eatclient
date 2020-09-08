import React from 'react'

export default function MenuItem(props) {

    function renderIfHasValue(value){
        if (value) {
            return <li>value</li>
        }
    }

    return (
        <div className="card">
            <li>{props.menuItem.name}</li>
            {renderIfHasValue(props.menuItem.description)}
            {renderIfHasValue(props.menuItem.price)}
            {renderIfHasValue(props.menuItem.categories)}
        </div>
    )
}
