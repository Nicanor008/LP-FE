import React from 'react'
import Features from "../../../../../images/version2/Features.svg"
import Catalog from "../../../../../images/version2/catalog.svg"
import "./development.scss"

const Development = () => {
    return (
        <div className="version2Development">
            <div className="version2Development__features">
                <p>LP Team is working on new features and enhancements on LP Product</p>
                <ol>
                    <li>Analytics Enhancements</li>
                    <li>Predict your todo activities</li>
                    <li>Goals Module</li>
                    <li>Team access and collaboration on the same activities</li>
                    <li>Organisation access</li>
                    <li>Payment module</li>
                    <li>LP Enhancements - minor & major system improvements</li>
                </ol>
                <img className="featuredImage" src={Features} alt="features" />
            </div>
            <img src={Catalog} alt="catalog" className="version2Development__catalogImage" />
        </div>
    )
}

export default Development
