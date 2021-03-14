import React from 'react'
import Nic from "../../../../../images/version2/testimonial/nic.svg"
import Flower from "../../../../../images/version2/testimonial/flower.svg"
import FlowerBlue from "../../../../../images/version2/testimonial/flower-blue.svg"
import Dots from "../../../../../images/version2/testimonial/dots.svg"
import DotsBlue from "../../../../../images/version2/testimonial/dots-blue.svg"
import "./feedback.scss"

const Feedback = () => {
    return (
        <div className="feedbackWrapper">
            <img className="feedbackWrapper__flowerImage" src={Flower} alt="flower" />
            <img className="feedbackWrapper__blueFlowerImage" src={FlowerBlue} alt="flower" />
            <img className="feedbackWrapper__dotsFullImage" src={DotsBlue} alt="dots" />
            <img className="feedbackWrapper__dotsLessImage" src={Dots} alt="dots" />
        <div className="feedback">
            <div className="feedback__title">
                <center>
                    <h2>What our customers are saying</h2>
                    <hr />
                </center>
            </div>

            <div className="feedback__content">
                <div className="feedback__content-user">
                    <img src={Nic} alt="user" />
                    <div className="feeback__content-userDetails">
                        <p>Nicanor Korir</p>
                        <p>Software Engineer</p>
                    </div>
                </div>

                <div className="feedback__content-testimonial">
                    “Tracking my daily, weekly and monthly has always been an
                    headache for me. LP has helped me to track my progress and
                    become a better engineer. Well organised, customizable with 
                    great look and feel.”
                </div>
            </div>
        </div>
        </div>
    )
}

export default Feedback;
