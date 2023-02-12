import React, {useState} from "react";
import "./faceRecognition.css";

const FaceRecognition = (props) => {
    console.log(props.bounding_box.bottomRow)
    return(
        <div className="brainDetect__faceRecognition-container ma2 pa2 flex itens-center justify-center  absolute">
            <div>
                <img src={props.IMAGE_URL} 
                     className="br3" 
                     alt="image" 
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
                </div>
            </div>
        </div>
    )
};

export default FaceRecognition;

