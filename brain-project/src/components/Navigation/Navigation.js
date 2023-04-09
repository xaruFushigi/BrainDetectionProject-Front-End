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

const Navigaiton = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <div className="brainDetect__navbar">

            <div className="brainDetect__navbar-links">
                <div className="brainDetect__navbar-links_container">
                    <Menu />
                </div>  
            </div>
            { props.signInCondition === false ?
            <div className="brainDetect__navigation-signOut">
                <p>
                    <a href="#signOut" onClick={props.SignInButton}> Sign Out </a>
                </p>
            </div>
            :
            <div></div>
            }
            <div className="brainDetect__navbar-menu">
                {
                    toggleMenu ?
                    <RiCloseLine color="#fff" size={27} onClick={()=> setToggleMenu(false)} />
                    :
                    <RiMenu3Line color="#fff" size={27} onClick={()=> setToggleMenu(true)} />
                }
                {
                    toggleMenu && (
                        <div className="brainDetect__navbar-menu_container scale-up-center outline">
                            <div className="brainDetect__navbar-menu_container-links">
                                <Menu />
                                <div className="brainDetect__navbar-menu_container-links-sign">
                                    <p>
                                        <a href="#signOut" target="_blank"> Sign Out </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
};

export default Navigaiton;