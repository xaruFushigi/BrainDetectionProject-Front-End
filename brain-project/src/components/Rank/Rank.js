import React, {useState, useEffect} from "react";
import "./rank.css";

const Rank = (props) => {
    const name = props.name;
    const entries = props.entries;

    return(
            <div>
            {entries !== undefined ? (
                <div className='white f3'>
                {`${name}, your current entry count is...`}
                <div className='white f1'>{entries}</div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            </div>
    )
};

export default Rank;
