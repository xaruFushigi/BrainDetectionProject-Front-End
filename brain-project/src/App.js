import React, {useState, useEffect} from 'react';
// Import CSS files
import './App.css';
// Import Tachyons CSS library
import "tachyons";
// Import particle background library
import ParticlesBg from 'particles-bg';
// Import components
import { Navigation, Logo, ImageLinkForm, Rank, FaceRecognition, SignIn, Register } from "./components";



function App() {  
  const [input, setInput] = useState({inputValue: ""});  // Input field 
  const [effect, setEffect] = useState([]);              // Fetching data from API
  const [bounding_box, setBounding_box] = useState({})   // Fetching face data
  const [signInCondition, setSignInCondition] = useState(true); // To show and hide Sign In form 
  const [registerCondition, setRegisterCondition] = useState(false); // To show and hide Sign In form
  const [user, setUser] = useState({
                                    id: "",
                                    name: "",
                                    email: "",
                                    entries: 0,
                                    joined: ""
                                  }); 
  // API related necessary data
////////////////////////////////////////////////////////
  const USER_ID = 'xaru';
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '6d8707e3ccdd421a85a5b498a1717409'; //API key
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
useEffect(() => {
  // Send a request to the Clarifai API to detect faces in the image
  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Check if the response data contains a bounding box
      if (data.outputs && data.outputs[0].data.regions[0].region_info.bounding_box) {
        // Set the state with the bounding box coordinates
        setEffect(data.outputs[0].data.regions[0].region_info.bounding_box);
        // If the bounding box is found, access the local server
        fetch('http://localhost:3050/image', {
          method: 'put', // Use PUT method to update the server
          headers: { 'Content-Type': 'application/json' }, // Specify the content type as JSON
          body: JSON.stringify({
            id: user.id // Include the user ID in the request body
          })
        });
      }
    })
    .then(count => setUser({...user, entries: count}))
    .catch(error => console.log(error)); // Handle any errors that occur during the fetch request
}, [input.inputValue, user.id]); // Only re-run the effect if the input value or user ID changes

//square box which shows detected face in the image
  const calculateBox = () => {
    const image = document.getElementById("inputImage"); 
    const width = Number(image.width);
    const height = Number(image.height);  
    setBounding_box(
      { //calculation of bounds of the detected face
        leftCol  : effect.left_col * width,               //left column
        topRow   : effect.top_row  * height,              //top row
        rightCol : width - (effect.right_col * width),    //right column
        bottomRow: height - (effect.bottom_row * height), //bottom row
        }
      ) 
  }
//detect Button function on press
  const DetectButton = () => {  //Detect Button function
    calculateBox();                //implementing detected face's border
  }; 

//input function of the inseterd image url
const InputFunction = (event) => { 
  const {value} = event.target; //destructuring 
  setInput(() => {return {inputValue : value}}); //returning url link in the input
};
//Sign In/Out form condition: after pressing the button goes to the second page                                                                          
const SignInButton = () => {  
  setSignInCondition(prevState => !prevState)
};
//after pressing button of SignUp goes to the second page
const RegisterLink = () => {
  setRegisterCondition(prevState => !prevState)
};
 //to load user from database in the backend server
const loadUser = (data) => {
            setUser({
                      id: data.id,
                      name: data.name,
                      email: data.email,
                      entries: data.entries,
                      joined: data.joined
                    })
  };

return (
    <div className="App h-auto">      
      <Navigation  SignInButton={SignInButton} />
      {
      signInCondition === false ?
      <div>
        <Logo />
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm searchfield   ={input.inputValue} 
                       InputFunction ={InputFunction   } 
                       DetectButton  ={DetectButton  }
        />
        <FaceRecognition IMAGE_URL   ={input.inputValue} 
                         bounding_box={bounding_box}
        /> 
      </div>
      :
       (registerCondition === true ? 
        <Register  RegisterLink={RegisterLink} loadUser={loadUser}/>
        :
        <SignIn  SignInButton={SignInButton}  RegisterLink={RegisterLink} loadUser={loadUser}/>
      )
      }
      <ParticlesBg type='circle' bg={true} className="particles h-100"/> {/* react particles library*/}
    </div>
  );
}

export default App;



// import React, {useState, useEffect} from 'react';
// //css imports
// import './App.css';
//   //external css imports
//   import "tachyons";
//   import ParticlesBg from 'particles-bg';

// import { Navigation, Logo, ImageLinkForm, Rank, FaceRecognition, SignIn, Register } from "./components";



// function App() {  
//   const [input, setInput] = useState({inputValue: ""});  //input field 
//   const [effect, setEffect] = useState([]);              //fetching data from API
//   const [bounding_box, setBounding_box] = useState({})  //fetching face data
//   const [signInCondition, setSignInCondition] = useState(true); //to show and hide Sign In form 
//   const [registerCondition, setRegisterCondition] = useState(false); //to show and hide Sign In form
//   const [user, setUser] = useState({
//                                     id: "",
//                                     name: "",
//                                     email: "",
//                                     entries: 0,
//                                     joined: ""
//                                   }); 
//   //API related necessary data
// ////////////////////////////////////////////////////////
//   const USER_ID = 'xaru';
//   // Your PAT (Personal Access Token) can be found in the portal under Authentification
//   const PAT = '6d8707e3ccdd421a85a5b498a1717409'; //API key
//   const APP_ID = 'my-first-application';
//   // Change these to whatever model and image URL you want to use
//   const MODEL_ID = 'face-detection';  
//   const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
//   var IMAGE_URL = input.inputValue; 

//   const raw = JSON.stringify({
//       "user_app_id": {
//           "user_id": USER_ID,
//           "app_id": APP_ID
//       },
//       "inputs": [
//           {
//               "data": {
//                   "image": {
//                       "url": IMAGE_URL
//                   }
//               }
//           }
//       ]
//   });

//   const requestOptions = {
//       method: 'POST',
//       headers: {
//           'Accept': 'application/json',
//           'Authorization': 'Key ' + PAT
//       },
//       body: raw
//   };
// ////////////////////////////////////////////////////////
// useEffect(() => {
//   // Send a request to the Clarifai API to detect faces in the image
//   fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
//     .then(response => response.json()) // Parse the response as JSON
//     .then(data => {
//       // Check if the response data contains a bounding box
//       if (data.outputs && data.outputs[0].data.regions[0].region_info.bounding_box) {
//         // Set the state with the bounding box coordinates
//         setEffect(data.outputs[0].data.regions[0].region_info.bounding_box);
//         // If the bounding box is found, access the local server
//         fetch('http://localhost:3050/image', {
//           method: 'put', // Use PUT method to update the server
//           headers: { 'Content-Type': 'application/json' }, // Specify the content type as JSON
//           body: JSON.stringify({
//             id: user.id // Include the user ID in the request body
//           })
//         });
//       }
//     })
//     .then(count => setUser({...user, entries: count}))
//     .catch(error => console.log(error)); // Handle any errors that occur during the fetch request
// }, [input.inputValue, user.id]); // Only re-run the effect if the input value or user ID changes

// //square box which shows detected face in the image
//   const calculateBox = () => {
//     const image = document.getElementById("inputImage"); 
//     const width = Number(image.width);
//     const height = Number(image.height);  
//     setBounding_box(
//       {
//         leftCol  : effect.left_col * width,
//         topRow   : effect.top_row  * height,
//         rightCol : width - (effect.right_col * width),
//         bottomRow: height - (effect.bottom_row * height),
//         }
//       ) 
//   }
// //detect Button function on press
//   const submitFunction = () => { 
//     calculateBox();
//   }; 

// //input function  
// const inputFunction = (event) => {
//   const {value} = event.target;
//   setInput(() => {return {inputValue : value}});
// };
// //Sign In/Out form condition: after pressing the button goes to the second page                                                                          
// const SignInForm = () => {
//   setSignInCondition(prevState => !prevState)
// };
// //after pressing button of SignUp goes to the second page
// const RegisterForm = () => {
//   setRegisterCondition(prevState => !prevState)
// };
//  //to load user from database in the backend server
// const loadUser = (data) => {
//             setUser({
//                       id: data.id,
//                       name: data.name,
//                       email: data.email,
//                       entries: data.entries,
//                       joined: data.joined
//                     })
//   };

// return (
//     <div className="App h-auto">      
//       <Navigation  signInButtonState={SignInForm} signInCondition={signInCondition }/>
//       {
//       signInCondition === false ?
//       <div>
//         <Logo />
//         <Rank name={user.name} entries={user.entries} />
//         <ImageLinkForm searchfield   ={input.inputValue} 
//                        inputFunction ={inputFunction   } 
//                        submitFunction={submitFunction  }
//         />
//         <FaceRecognition IMAGE_URL   ={input.inputValue} 
//                          bounding_box={bounding_box}
//         /> 
//       </div>
//       :
//        (registerCondition === true ? 
//         <Register  registerButtonState={RegisterForm} loadUser={loadUser}/>
//         :
//         <SignIn  signInButtonState={SignInForm}  registerButtonState={RegisterForm} loadUser={loadUser}/>
//       )
//       }
//       <ParticlesBg type='circle' bg={true} className="particles h-100"/> {/* react particles library*/}
//     </div>
//   );
// }

// export default App;