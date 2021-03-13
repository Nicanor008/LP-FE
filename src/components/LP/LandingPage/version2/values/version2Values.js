import React from 'react'
import "./version2Values.scss"
import LPCycle from "../../../../../images/version2/lp-cycle.svg"
import Value1 from "../../../../../images/icons/version2/blue.svg"
import Value2 from "../../../../../images/icons/version2/orange.svg"
import Value3 from "../../../../../images/icons/version2/green.svg"
import Value4 from "../../../../../images/icons/version2/yellow.svg"
import Value from './value'

const Version2Values = ({ img, title, tag }) => {
    return (
        <div className="version2values">
            <img className="version2values__image" src={LPCycle} />
            <div style={{ alignSelf: 'center' }}>
                <div className="version2values__wrapper">
                    <Value
                        image={Value1}
                        title="Manage"
                        description="The answer to your need for furniture with shapes, sizes and colors."
                    />
                    <Value
                        image={Value2}
                        title="Analyse"
                        description="Detailed and custom controlled metrics and analytics on your dashboard"
                    />
                </div>
                <div className="version2values__wrapper">
                    <Value
                        image={Value3}
                        title="Predict"
                        description="With the help of our internal AI, we do predict your learnings."
                    />
                    <Value
                        image={Value4}
                        title="Inspired"
                        description="Get daily random quotes at your fingertips. We get you inspired."
                    />
                </div>
            </div>
        </div>
    )
}

export default Version2Values;
