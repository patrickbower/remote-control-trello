const Config = {
  settings: {
    key: "bb6807f13b020310a0543a81ebf10765",
    token: "d89724c1f1285f66151e76c547600c779272f3df7cb7124dabe1f421324bd42c",
    listId: "5a4b9b594982ebae92b8c07e"
  },
  url: function(prams){
    return `https://api.trello.com${prams}&key=${this.settings.key}&token=${this.settings.token}`
  },
  getCards: {
    method: "GET",
    url: function(pram) { 
      return `/1/lists/${pram}/cards?`;
    }
  },
  addDueDate: {
    method: "PUT",
    url: function(id, time){
      return `/1/cards/${id}?due=${time}`;
    }
  },
  archiveCard: {
    method: "PUT",
    url: function(id) { 
      return `/1/cards/${id}?closed=true`;
    }
  }
}

export default Config;