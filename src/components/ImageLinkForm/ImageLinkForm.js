import React from "react";
import "./imageLinkForm.css";

const ImageLinkForm = () => {
    return(
        <div className="brainDetect__imageLinkForm-container">
            <p>{'This Magic Brain will detect faces in your pictures. Give it a try'}</p>
            <div className="brainDetect__imageLinkForm-input-container shadow-5 br4 outline">
                <input type="text" 
                       className="brainDetect__imageLinkForm-input" 
                       placeholder="input image url here"
                       />
                <button className="brainDetect__imageLinkForm-detect-button grow tc">
                    Detect
                </button>
            </div>
        </div>
    )
};

export default ImageLinkForm;