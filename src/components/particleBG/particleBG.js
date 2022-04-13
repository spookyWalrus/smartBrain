import React from 'react';
import Particles from 'react-tsparticles';

const particleOptions = ({particleOptions}) => {
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
	        detectRetina: true
	
}



export default particleOptions;