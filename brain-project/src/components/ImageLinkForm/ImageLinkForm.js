import React from "react";
import "./imageLinkForm.css";

const ImageLinkForm = (props) => {
    return(
        <div className="brainDetect__imageLinkForm-container">
            <p>{'This Magic Brain will detect faces in your pictures. Give it a try'}</p>
            <div className="brainDetect__imageLinkForm-input-container shadow-5 br4 outline">
                <input type="text" 
                       className="brainDetect__imageLinkForm-input" 
                       placeholder="input image url here"
                       value={props.searchfield}
                       onChange={props.inputFunction}
                       />
                
                <button className="brainDetect__imageLinkForm-detect-button grow tc"
                        onClick={props.DetectButton}
                >
                    Detect
                </button>
            </div>
        </div>
    )
};

export default ImageLinkForm;