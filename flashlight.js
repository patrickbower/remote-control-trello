"use strict";

import { errorOut } from './utils.js';

class Flashlight {
  constructor() {
    this.settings = {
      blink: false,
      timer: null,
      track: undefined,
      stopBtn: ".stop-btn"
    }
  }

  init() {
    this.events();
    this.stream();
  }

  events() {
    window.addEventListener('flashlight', (event) => {
      if (event.detail.text() === 'start'){
        this.settings.blink = true
        this.blinkLight();
      }
    });

    document.querySelector(this.settings.stopBtn)
      .addEventListener("click", () => {
        clearInterval(this.settings.timer);
        this.settings.blink = false;
        this.onCapabilitiesReady(
          this.settings.track.getCapabilities() 
        );
      })
  }
  
  stream() {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { exact: "environment" } }
    })
    .then((stream) => {
      const video = document.querySelector('video');
      video.srcObject = stream;
      
      // get the active track of the stream
      this.settings.track = stream.getVideoTracks()[0];
    
      video.addEventListener('loadedmetadata', (e) => {
        console.log("streaming");
      });
    })
    .catch(error => errorOut('streaming failed', error));
    
  }

  blinkLight() {
    this.settings.timer = setInterval(() => {
      this.onCapabilitiesReady(
        this.settings.track.getCapabilities(), 
        this.settings.blink = !this.settings.blink
      );
    }, 500)
  }
  
  lightOn() {
      this.onCapabilitiesReady(
        this.settings.track.getCapabilities(),
        this.settings.blink = true
      );
  }

  onCapabilitiesReady(capabilities) {
    if (capabilities.torch) {
      this.settings.track.applyConstraints({
        advanced: [{torch: this.settings.blink}]
      }).catch(error => errorOut('streaming failed', error));
    }
  }
}

export default Flashlight;