import React, {Component} from 'react';
// import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';



const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}

class App extends Component {
   constructor() {
      super();
      this.state  = initialState;
   }

    loadUser = (data) =>{
      this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
      })
   }


   onInputChange = (event) => {
      this.setState({input:event.target.value});
    }

  afterAPIcall = () =>{ // increment counter
    // fetch('https://polar-stream-61468.herokuapp.com/image', {
    fetch('https://smartbrain-api-e1it.onrender.com/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
           id: this.state.user.id
        })
    })
    .then(response=> response.json())
    .then(count=> {
        this.setState(Object.assign(this.state.user,
            { entries: count }
        ))
    })
    .catch(error => console.log('error', error));
  }

  onApiCreds = () =>{ // retrieves API credentials to access Clarifai
         fetch('https://smartbrain-api-e1it.onrender.com/imageurl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.imageUrl
      })
    })
    .then(response => response.json())
    .then(response => {
        if(response) {
           // this.onAPIcall(response) // make  call to Clairfai
            fetch("https://api.clarifai.com/v2/models/face-detection/outputs", response)
            .then(response => response.text())
            .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
            .then(this.afterAPIcall())
            .catch(error => console.log('error for onAPIcall',error));
        }})
    .catch(error => console.log('error for onApiCreds',error));
  }

  onAPIcall = (creds) =>{
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", creds)
    .then(response => response.text())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .then(this.afterAPIcall())
    .catch(error => console.log('error for onAPIcall',error));
  }

  calculateFaceLocation = (result) =>{
    const box = JSON.parse(result, null, 2).outputs[0].data;
    const face = box.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');    
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * width)
    }
   }

   displayFaceBox = (box) => {
    this.setState({box: box})
   }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input}, ()=>{
    this.onApiCreds();
    });
  }

//  https://this-person-does-not-exist.com/en

    onRouteChange = (route) =>{
      if(route === 'signout'){
          this.setState(initialState)
      }else if (route === 'home'){
          this.setState({isSignedIn: true})
      }
        this.setState({route: route});
    }

   render(){
      return (
         <div className="App">
            <ParticlesBg type="thick" color="#74cdac" num={200} bg={true} />
            <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
            {this.state.route === 'home'
                ? 
                <div>
                    <Logo />
                    <Rank 
                      name={this.state.user.name}
                      entries={this.state.user.entries}
                    />
                    <ImageLinkForm 
                       onInputChange={this.onInputChange}
                       onButtonSubmit={this.onButtonSubmit}
                    />
                    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                </div>
                : (this.state.route === 'signin'
                  ? <Signin 
                      onRouteChange={this.onRouteChange}
                      loadUser={this.loadUser}
                    />
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />  
                  )
            }
         </div>
      );
   }
}

export default App;
