"use strict";

import {
  errorOut,
  timeFromNow
} from './utils.js';
import Config from './trello-settings.js';
import countdown from './countdown.js';
import flashlight from './flashlight.js';

class Trello {
  constructor() {
    this.settings = {
      card: null,
      cardName: ".card-name",
      completeBtn: ".complete-btn",
      timePerTask: 20
    }
  }

  init(){
    this.query();
    this.bind();
    this.start();
  }

  start(){
    this.getCards().then((response) => {
      if (response instanceof Object) {
        this.setCard(response);
      } else {
        errorOut('Network response failed getting cards');
      }
    }).catch((error) => {
      errorOut('Fetch has failed getting cards', error);
    });
  }

  bind(){
    window.addEventListener('orientation', (event) => {
      if (event.detail.text() === 'facedown'){
        this.startPomodoro();
      }
    });
    
    document.querySelector('.complete-btn').addEventListener('click', ()=> {
      this.closeTask();
    })
  }

  closeTask() {
    this.archiveCard().then((response) => {
      if (response instanceof Object) {
        this.start();
      } else {
        errorOut('Network response failed archiving card');
      }
    }).catch((error) => {
      errorOut('Fetch has failed archiving card', error);
    });
  }

  startPomodoro(){
    this.addDueDate().then((response) => {
      if (response instanceof Object) {
        this.startCountDown();
      } else {
        errorOut('Network response failed adding due date');
        flashlight.lightOn();
      }
    }).catch((error) => {
      errorOut('Fetch has failed adding due date', error);
      flashlight.lightOn();
    });
  }

  startCountDown() {
    let Countdown = new countdown();
    Countdown.init();
    Countdown.start(this.dueTime);
  }

  query() {
    this.cardUi = document.querySelector(this.settings.cardName);
  }

  setCard(cards){
    this.card = cards[0];
    this.cardUi.innerText = this.card.name;
  }
  
  async ajaxRequest(url, method){
    const response = await fetch(url, {method});
    const json = await response.json();
    return json;
  }
  
  async getCards(){
    let url = this.getCardsUrl();
    return await this.ajaxRequest(url, Config.getCards.method);
  }

  async addDueDate(){
    console.log(this.card.id);
    let url = this.dueDateUrl(this.card.id);
    return await this.ajaxRequest(url, Config.addDueDate.method);
  }

  async archiveCard() {
    const url = this.getArchiveUrl();
    return await this.ajaxRequest(url, Config.addDueDate.method);
  }

  getCardsUrl(){
    let list = Config.settings.listId;
    let prams = Config.getCards.url(list);
    return Config.url(prams);
  }

  dueDateUrl(cardId){
    this.dueTime = timeFromNow(this.settings.timePerTask);
    let prams = Config.addDueDate.url(cardId, this.dueTime.toISOString())
    return Config.url(prams);
  }

  getArchiveUrl(){
    let cardId = this.card.id;
    let prams = Config.archiveCard.url(cardId);
    return Config.url(prams);
  }
}

export default Trello;