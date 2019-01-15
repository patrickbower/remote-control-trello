"use strict";

import * as utils from './utils.js';

class Flashlight {
  constructor() {
    this.settings = {
      blink: false,
      timer: null,
      track: undefined,
      startBtn: ".start-btn",
      stopBtn: ".stop-btn"
    }
  }

  init() {
    if (utils.isMobileDevice) { return false };
    this.events();
    this.stream();
  }

  events() {
    document.querySelector(this.settings.startBtn)
    .addEventListener("click", () => {
        this.settings.blink = true
        this.blinkLight();
      })

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
    .catch(err => console.error('streaming failed: ', err));
  }

  blinkLight() {
    this.settings.timer = setInterval(() => {
      this.onCapabilitiesReady(
        this.settings.track.getCapabilities(), 
        this.settings.blink = !this.settings.blink
      );
    }, 500)
  }

  onCapabilitiesReady(capabilities) {
    if (capabilities.torch) {
      this.settings.track.applyConstraints({
        advanced: [{torch: this.settings.blink}]
      }).catch(e => console.log(e));
    }
  }
}

export default Flashlight;