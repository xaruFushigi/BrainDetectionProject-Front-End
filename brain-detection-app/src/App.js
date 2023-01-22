import React from 'react';
//css imports
import './App.css';
  //external css imports
  import "tachyons";
  import ParticlesBg from 'particles-bg';


import { Navigation, Logo, ImageLinkForm, Rank } from "./components";

function App() {
  return (
    <div className="App">
      <ParticlesBg type='circle' bg={true} className="particles"/> {/* react particles library*/}
      
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*
      <FaceRegnition /> */}

    </div>
  );
}

export default App;
