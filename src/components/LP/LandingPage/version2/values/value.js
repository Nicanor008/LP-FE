import React from 'react'

const Value = ({ image, title, description }) => {
    return (
        <div className="version2values__allValues">
            <div className="version2values__allValues-title">
                <img className="version2values" src={image} alt="v2 values" />
                <h3>{title}</h3>
            </div>
            <div className="version2values__body">
                {description}
            </div>
        </div>
    )
}

export default Value
