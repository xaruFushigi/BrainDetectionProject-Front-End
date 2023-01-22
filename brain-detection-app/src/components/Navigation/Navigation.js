import React, {useState} from "react";
import "./navigation.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
const Menu  = () => (
    <> 
       <p> <a href="#home">Home</a> </p>
       <p> <a href="#wgpt3">What is GPT3</a> </p>
       <p> <a href="#possibility">Open AI</a> </p>
       <p> <a href="#features">Case Studies</a> </p>
       <p> <a href="#blog">Library</a> </p>
    </>
   )

const Navigaiton = () => {
    const [toggleMenu, setToggleMenu] = useState(true);
    return (
        <div className="brainDetect__navigation_container">

            
            <div className="brainDetect__navigation-links">
                <Menu />
            </div>

            <div className="brainDetect__navigation-signOut">
                <p>
                    <a href="#signOut" target="_blank"> Sign Out </a>
                </p>
            </div>

            <div className="brainDetect__navbar-menu">
                {
                    toggleMenu ?
                    <RiCloseLine color="#fff" size={27} onClick={()=> setToggleMenu(false)} />
                    :
                    <RiMenu3Line color="#fff" size={27} onClick={()=> setToggleMenu(true)} />
                }

            </div>


        </div>
    )
};

export default Navigaiton;