"use strict";

import * as utils from './utils.js';
import Config from './trello-settings.js';
import countdown from './countdown.js';

// trello api
class Trello {
  constructor() {
    this.settings = {
      cardName: ".card-name"
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
    // ToDo: Replace with device flip orientation
    document.querySelector('.fake-flip-btn').addEventListener('click', ()=> {
      this.addDueDate().then((response) => {
        if (response instanceof Object) {
          this.startCountDown()
        } else {
          throw new Error('Network response failed');
          // ToDo: turn the led on (no flash) to indicate issue
        }
      });
    })
  }

  startCountDown() {
    let Countdown = new countdown();
    Countdown.init();
    Countdown.start(this.dueTime);
  }

  query() {
    this.cardUi = document.querySelector(this.settings.cardName);
  }

  async getCards(){ 
    return await this.ajaxRequest(this.getCardsUrl(), Config.getCards.method);
  }

  setCard(cards){
    this.cardUi.innerText = cards[0].name;
    this.cardUi.dataset.id = cards[0].id;
  }

  async ajaxRequest(url, method){
    const response = await fetch(url, {method});
    const json = await response.json();
    return json;
  }

  async addDueDate(){
    let url = this.dueDateUrl(this.cardUi.dataset.id);
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
}

export default Trello;