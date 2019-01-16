"use strict";

import * as utils from './utils.js';
import Config from './trello-settings.js';
import countdown from './countdown.js';

// trello api
class Trello {
  constructor() {
    this.settings = {
      card: null,
      cardName: ".card-name",
      completeBtn: ".complete-btn"
    }
  }

  init(){
    this.query();
    this.bind();
    this.start();
  }

  start(){
    this.getCards().then((cards) => {
      this.setCard(cards);
    })
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
        // ToDo: Add simple error messaging component
        console.error('Bugger, Network response failed');
      }
    }).catch((error) => {
      console.error('Bugger, fetch has failed', error);
    });
  }

  startPomodoro(){
    this.addDueDate().then((response) => {
      if (response instanceof Object) {
        this.startCountDown();
      } else {
        console.error('Bugger, Network response failed');
        // ToDo: turn the led on (no flash) to indicate issue
      }
    }).catch((error) => {
      console.error('Bugger, fetch has failed', error);
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
    // ToDo: update time 5 to be correct
    this.dueTime = utils.timeFromNow(1);
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