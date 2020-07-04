import React from 'react';

const ButtonAction = (props)=>{
    return(
        <button className={props.class} onClick={props.onClick}>{props.text}</button>
    )
}

export default ButtonAction;