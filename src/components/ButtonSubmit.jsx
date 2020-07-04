import React from 'react';

const ButtonSubmit = (props)=>{
    return(
        <button className={props.class} type="submit">{props.text}</button>
    )
}

export default ButtonSubmit;