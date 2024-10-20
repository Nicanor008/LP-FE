import React from 'react'
import "./version2.scss"

const Version2Header = ({ img, title, tag }) => {
    return (
        <div className="version2Header">
            <img className="version2Header"  src={img} alt="v2header" />
            <h1>{title}</h1>
            <hr />
            <h1 className="version2Header__tag">{tag}</h1>
        </div>
    )
}

export default Version2Header;
