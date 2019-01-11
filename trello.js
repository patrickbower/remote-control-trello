"use strict";

import * as utils from './utils.js';

//Device Orientation
class Trello {
  constructor() {
    this.api = {
      settings: {
        key: "bb6807f13b020310a0543a81ebf10765",
        token: "d89724c1f1285f66151e76c547600c779272f3df7cb7124dabe1f421324bd42c",
        listId: "5a4b9b594982ebae92b8c07e"
      },
      url: function(prams){
        return `http://api.trello.com${prams}&key=${this.settings.key}&token=${this.settings.token}`
      },
      getCards: {
        action: "GET",
        url: function(pram) { 
          return `/1/lists/${pram}/cards?`;
        }
      },
      addDueDate: {
        action: "PUT",
        url: function(id, time){
          return `/1/cards/${id}?due=${time}`;
        }
      }
    }

    console.log(this.getCards());
    console.log(this.setDueDate());
  }

  getCards(){
    let list = this.api.settings.listId;
    let prams = this.api.getCards.url(list);
    return this.api.url(prams);
  }

  setDueDate(){
    let cardId = "5c2de93a607193426d3824de";
    let newDueDate = utils.timeFromNow(5).toISOString();
    let prams = this.api.addDueDate.url(cardId, newDueDate)
    return this.api.url(prams);
  }
}

export default Trello;