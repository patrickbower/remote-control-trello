"use strict";

//Device Orientation
class Orientation {
  constructor(){    
    this.settings = {
      currentOrientation: null
    }
  }
  
  init() {
    this.bind()
  }

  bind() {
    // device orientation
    let {currentOrientation} = this.settings;
    let newOrientation = null;    
      window.addEventListener('deviceorientation', (event) => {
        Math.round(event.beta) > 90 ? 
          newOrientation = 'facedown' : 
          newOrientation = 'faceup';

          if (currentOrientation !== newOrientation) {
            this[newOrientation]()
            currentOrientation = newOrientation;
          }
    });
  }

  facedown() {
    console.log('facedown');
  }

  faceup() {
    console.log('faceup');
  }
}

export default Orientation;