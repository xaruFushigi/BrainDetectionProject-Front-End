import React, {useState, useEffect} from 'react';
//css imports
import './App.css';
  //external css imports
  import "tachyons";
  import ParticlesBg from 'particles-bg';

import { Navigation, Logo, ImageLinkForm, Rank, FaceRecognition, SignIn, Register } from "./components";

function App() {
  
  const [input, setInput] = useState({inputValue: ""});  //input field 
  const [submit, setSubmit] = useState("");              //detect button 
  const [effect, setEffect] = useState([]);              //fetching data from API
  const [bounding_box, setBounding_box] = useState({})  //fetching face data
  const [signInCondition, setSignInCondition] = useState(true); //to show and hide Sign In form 
  const [registerCondition, setRegisterCondition] = useState(false); //to show and hide Sign In form 
  //API related necessary data
////////////////////////////////////////////////////////
  const USER_ID = 'xaru';
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '6d8707e3ccdd421a85a5b498a1717409';
  const APP_ID = 'my-first-application';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';  
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
  var IMAGE_URL = input.inputValue; 

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
////////////////////////////////////////////////////////
  //fetching data from API
useEffect(()=> {
  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
  .then(response => response.json())
  .then(result => setEffect(result.outputs[0].data.regions[0].region_info.bounding_box))
  },[input.inputValue, bounding_box]);

  const calculateBox = () => {
    const image = document.getElementById("inputImage"); 
    const width = Number(image.width);
    const height = Number(image.height);  
    setBounding_box(
      {
        leftCol  : effect.left_col * width,
        topRow   : effect.top_row  * height,
        rightCol : width - (effect.right_col * width),
        bottomRow: height - (effect.bottom_row * height),
        }
      ) 
  }
//detect Button function on press
  const submitFunction = () => { 
      calculateBox()
  }; 

//input function  
const inputFunction = (event) => {
  const {value} = event.target;
  setInput(() => {return {inputValue : value}});
};
//Sign In/Out form condition                                                                           
const SignInForm = () => {
  setSignInCondition(prevState => !prevState)
};

const RegisterForm = () => {
  setRegisterCondition(prevState => !prevState)
};

  return (
    <div className="App">      
      <Navigation  signInButtonState={SignInForm} signInCondition={signInCondition }/>
      {
      signInCondition === false ?
      <div>
        <Logo />
        <Rank />
        <ImageLinkForm searchfield   ={input.inputValue} 
                      inputFunction ={inputFunction   } 
                      submitFunction={submitFunction  }
        />
        <FaceRecognition IMAGE_URL   ={input.inputValue} 
                        bounding_box={bounding_box}
        /> 
      </div>
      :
       (registerCondition === true ? 
        <Register  registerButtonState={RegisterForm}/>
        :
        <SignIn  signInButtonState={SignInForm}  registerButtonState={RegisterForm}/>
      )
      }
      <ParticlesBg type='circle' bg={true} className="particles"/> {/* react particles library*/}
    </div>
  );
}

export default App;



