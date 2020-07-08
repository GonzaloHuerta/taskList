import React from 'react';

const Error = (props)=>{
    return(
        <div className="alert alert-danger" role="alert">
            {props.text}
        </div>
    )
}

export default Error;