import React from 'react'

const getStyle = (props) => {
    let baseClass = "alert ";
    if(props.message.msgError) baseClass = baseClass + "alert-danger";
    else baseClass = baseClass + "alert-primary"
    return baseClass + " text-center";
}

export default function Message(props) {
    return (
        <div className={getStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    )
}
