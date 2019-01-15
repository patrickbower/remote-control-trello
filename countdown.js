"use strict";

class Countdown {
  constructor(){    
    this.settings = {
      time: 25,
      timer: ".timer"
    }
  }
  
  init() {
    this.query();
  }

  query(){
    this.timerUi = document.querySelector(this.settings.timer);
  }

  start(dueTime){
    const milliseconds = Math.abs(new Date() - dueTime);
    this.alarm(milliseconds);
    this.timer(milliseconds);
  }

  alarm(milliseconds){
    setTimeout(() => {
      clearTimeout(this.timer);
      console.log("DONE");
    }, milliseconds + 1000);
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