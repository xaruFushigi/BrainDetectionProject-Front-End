import React, {useState} from "react";
import "./faceRecognition.css";
import ParticlesBg from 'particles-bg';

const FaceRecognition = (props) => {
    console.log(props.bounding_box.bottomRow)
    return(
        <div className="w-100 center ml7 pl7">
            <div className="absolute ml6">
                <img src={props.IMAGE_URL} 
                     className="br3" 
                     alt="" 
                     width={500} 
                     height="auto"
                     id="inputImage"
                />
                <div className="bounding-box"
                     width={props.bounding_box.leftCol}
                     style={{
                             top    : props.bounding_box.topRow,
                             bottom : props.bounding_box.bottomRow,
                             left   : props.bounding_box.leftCol,
                             right  : props.bounding_box.rightCol, 
                           }}
                >
                <ParticlesBg type='circle' bg={true} className="particles"/> {/* react particles library*/}

                </div>
            </div>
        </div>
    )
};

export default FaceRecognition;

