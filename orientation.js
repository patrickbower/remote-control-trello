"use strict";

//Device Orientation
class Orientation {
  constructor(){
    this.trello = {
      key: "bb6807f13b020310a0543a81ebf10765",
      token: "d89724c1f1285f66151e76c547600c779272f3df7cb7124dabe1f421324bd42c"
    }
    
    this.settings = {
      orientation: null
    }
  }
  
  init() {
    console.log('init');
    // detect if device has been flipped over
    window.addEventListener('deviceorientation', (event) => {
      if (Math.round(event.beta) > 90) {
        this.settings.orientation = 'facedown';
        this.facedown();
      } else {
        this.settings.orientation = 'faceup';
        this.faceup();
      }
    });
  }

  facedown() {
    console.log('facedown');
  }

  faceup() {
    console.log('faceup');
  }
  
  
  
  // if flipped onto face
  // timestamp fpr +20mins from timeNow()
  // ping Trello
  //// Trello
  // store API/board/list key
  // add 'due date' to first card in list
  // on success callback show stop button to cancel anytime
  // display simple timer
  // when timestamp due date elapsed
  //// flashlight
  // start flashing light
  // click stop button
  // stop flashing light
  // ping Trello to remove 'due date'
}

export default Orientation;