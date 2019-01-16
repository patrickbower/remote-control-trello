"use strict";

import flashlight from './flashlight.js';

class Countdown {
  constructor(){    
    this.settings = {
      time: 25,
      timer: ".timer",
      timerRunning: false
    }
    this.Flashlight = new flashlight();
  }
  
  init() {
    this.query();
    this.initFlashlight()
  }

  initFlashlight(){
    this.Flashlight.init();
  }

  query(){
    this.timerUi = document.querySelector(this.settings.timer);
  }

  start(dueTime){
    if (this.timerRunning) return;
    const milliseconds = Math.abs(new Date() - dueTime);
    this.alarm(milliseconds);
    this.timer(milliseconds);
  }

  alarm(milliseconds){
    setTimeout(() => {
      clearTimeout(this.timer);
      this.startFlashlight();
      this.timerRunning = false;
      console.log("DONE");
    }, milliseconds + 1000);
  }

  startFlashlight(){
    window.dispatchEvent(new CustomEvent('flashlight', { 
        bubbles: true, 
        detail: { text: () => 'start' }
      })
    );
  }

  convertMillisecondsToTime(milliseconds){
    // milliseconds = 1000*Math.round(milliseconds/1000);
    var date = new Date(milliseconds);
    return date.getUTCMinutes() + ':' + ("0" + date.getUTCSeconds()).slice(-2);
  }

  timer(milliseconds){
    let counter = milliseconds
    this.timer = setInterval(() => {
      let time = this.convertMillisecondsToTime(counter);
      this.updateTimerUi(time)
      counter -= 1000;
    }, 1000);
  }

  updateTimerUi(time){
    this.timerUi.innerText = time;
  }
}

export default Countdown;