import React, {Component} from 'react';
// import Clarifai from 'clarifai';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const particleOptions = {
        background: {
          color: {
            // value: "#f5f4c9",
            // linear-gradient(20deg,#FFE5FD 40%, #04C8ED 100%)
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 20,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 170,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ff6fff",
          },
          links: {
            color: "#d0f7d9",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 500,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
}



  const particlesInit = (main) => {
    // console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };
  const particlesLoaded = (container) => {
    // console.log(container);
  };

// Above needed for Particles Component intialization...


const app = new Clarifai.App({
 apiKey: 'f9a52f8f40844fa8baa9c2c383e58d1a'
});
// This is old way, now deprecated

// Above is to make API call to clarifai.com and get Face Detection done to image

class App extends Component {
   constructor() {
      super();
      this.state  = {
         input: '',
         imageURL: ''
      }
   }

   onInputChange = (event) => {
      console.log(event.target.value);
   }

   onButtonSubmit = () =>{
      this.setState({imageURL: this.state.input});

      app.models.predict("f9a52f8f40844fa8baa9c2c383e58d1a", "https://samples.clarifai.com/metro-north.jpg")
         .then(
         function(response){
            console.log(response);

         },
         function(err){
            // error!
         }
      );
   }


   render(){
      return (
         <div className="App">
            <Particles className="particles" 
                     options={particleOptions} 
                     init={particlesInit}
                     loaded={particlesLoaded} 
            />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm 
               onInputChange={this.onInputChange}
               onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={this.state.imageUrl} />
         </div>
      );
   }
}

export default App;
