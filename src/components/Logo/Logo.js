import React from "react";
import "./logo.css";
import Tilt from 'react-parallax-tilt';
const Logo = () => {
    return (
        <div className="brainDetect__logo_container">
            <div className="braindDetect__logo">
            <Tilt className="Tilt shadow-5">
                <div style={{height: "100%", width: "100%", border: "solid", borderRadius: "4rem"}} className="grow" >
                    <h1> ❤️</h1>
                </div>
            </Tilt>
            </div>
        </div>
    )
};

export default Logo;