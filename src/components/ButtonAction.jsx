import React from 'react';

const ButtonAction = (props)=>{
    return(
        <button className={props.class} onClick={props.onClick} type={props.type}>{props.text}</button>
    )
}

export default ButtonAction;