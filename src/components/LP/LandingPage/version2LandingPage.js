import React from "react"
import Version2Header from "./version2/header"
import Flower from "../../../images/version2/flower.jpg"
import Version2Values from "./version2/values/version2Values"
import "./landingPage.scss"
import Development from "./version2/development/development"
import RecordingIncoming from "../../../images/lp-incoming-video.svg"
import "./whyUseLP/whyUseLP.scss"
import Feedback from "./version2/feedback/feedback"

const Version2LandingPage = () => {
    return (
        <div>
            <div className="landingPage1stRow">
                {/* first row */}
                <center>
                    <p className="landingPage1stRow__text">
                        Smartly Manage your
                        <span className="landingPage1stRow__title">Activities</span>. 
                        Let’s Help you with{" "}
                        <span className="landingPage1stRow__title">Analysis</span> and{" "}
                        <span className="landingPage1stRow__title">Prediction</span>, 
                        and Get work 
                        <span className="landingPage1stRow__title">DONE</span>
                    </p>
                    <p className="landingPage1stRow__subtext">
                        LP is a free tool to help users track their daily activities with
                        self clinic and auto-generated analytics. Predictive analysis is in
                        development.
                    </p>
                    <button className="landingPage1stRow__button">GET STARTED</button>
                </center>
            </div>

            {/* image */}
            <div>
                <center><img className="imageRecording" src={RecordingIncoming} alt="recorded video" /></center>
            </div>

            <Version2Header
                img={Flower}
                title="Why Use Learning Pattern"
                tag="VALUES"
            />

            <Version2Values />

            <Version2Header
                img={Flower}
                title="New Features in Development"
                tag="AGILE"
            />

            <Development />

            {/* testimonial */}
            <Feedback />
        </div>
    )
}

export default Version2LandingPage
