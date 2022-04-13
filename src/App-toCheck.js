import React, {Component} from 'react';
// import Clarifai from 'clarifai';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
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
              distance: 300,
              duration: 2,
              opacity: 0.8,
              size: 20,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 120,
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
            speed: 1.5,
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
//     // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };
  const particlesLoaded = (container) => {
//     // console.log(container);
  };

// // Above needed for Particles Component intialization...


class App extends Component {
   constructor() {
      super();
      this.state  = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin'
      }
   }

   onInputChange = (event) => {
      this.setState({input:event.target.value});
    }
      // https://www.thefoodlens.com/uploads/2019/02/GANKO-RAMEN_THE-FOOD-LENS_BRIAN-SAMUELS-PHOTOGRAPHY_FEBRUARY-2019-0165-copy.jpg

  onAPIcall = () =>{
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": "7a01kgjbtwgm",
          "app_id": "e83cd2c610de44539de72c1f70ccacbb"
       },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.imageUrl
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // 'Authorization': '9bd15bd8ec014246bd53cff4f13826ed'
        // ^^ This is PAT, not API key
        'Authorization': 'Key f9a52f8f40844fa8baa9c2c383e58d1a'
         // ^^ This is API key
      },
      body: raw
    };
     // color-recognition
      // face-detection

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
        .then(response => response.text())
        // .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data))
        .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
  }

  calculateFaceLocation = (result) =>{
    const box = JSON.parse(result, null, 2).outputs[0].data;
        // console.log(JSON.parse(result, null, 2).outputs[0].data);
        // console.log(box.regions[0].region_info.bounding_box);
    const face = box.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');    
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * width)
    }
   }

   displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
   }

  onButtonSubmit = () =>{
    // const input = this.state.input;
    this.setState({imageUrl: this.state.input}, ()=>{
      this.onAPIcall();
      console.log(this.state.imageUrl);
    });
  }

//  https://this-person-does-not-exist.com/en

    onRouteChange = () =>{
        this.setState({route: 'home'});
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
                {this.state.route === 'signin'
                    ? 
                    <Signin onRouteChange={this.onRouteChange}/>
                    :
                    <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm 
                           onInputChange={this.onInputChange}
                           onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                    </div>
                }
             </div>
          );
       }
}

export default App;
