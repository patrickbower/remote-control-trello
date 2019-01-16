"use strict";

import * as utils from './utils.js';

//Device Orientation
class Orientation {
  constructor(){    
    this.settings = {
      currentOrientation: null
    }
  }
  
  init() {
    // if (utils.isMobileDevice) { return false };
    this.bind();
    this.events();
  }

  events(){
    this.event = new Event('deviceFlip');
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
    window.dispatchEvent(new CustomEvent('orientation', { 
        bubbles: true, 
        detail: { text: () => 'facedown' } 
      })
    );
  }

  faceup() {
    window.dispatchEvent(new CustomEvent('orientation', { 
        bubbles: true, 
        detail: { text: () => 'faceup' } 
      })
    );
  }
}

export default Orientation;