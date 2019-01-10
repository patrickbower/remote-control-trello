console.log("scrips running", $);

let APIKey = "bb6807f13b020310a0543a81ebf10765";
let APIToken = "d89724c1f1285f66151e76c547600c779272f3df7cb7124dabe1f421324bd42c";

//// device orientation
// detect if device has been flipped over
// if flipped onto face
// timestamp fpr +20mins from timeNow()
// ping trello

//// trello
// store API/board/list key
// add 'due date' to first card in list
// on success callback show stop button to cancel anytime
// setup webhook to fire back when due

// var exampleSocket = new WebSocket("ws://www.example.com/socketserver");
// exampleSocket.onmessage = function (event) {
//   console.log(event.data);
// }

$.ajax({
  url: `https://api.trello.com/1/tokens?webhooks=true&key=${APIKey}&token=${APIToken}`,
  type: 'DELETE',
  description: "clear webhook",
  callbackURL: "https://friendly-stonebraker-4efdef.netlify.com/",
  idModel: "5c1a5bc5e9a06b362599d79c",
  success: function(result) {
      console.log(result);
  }
});

$.ajax({
  url: `https://api.trello.com/1/members/me/tokens?webhooks=true&key=${APIKey}&token=${APIToken}`,
  type: 'GET',
  success: function(result) {
      console.log(result);
  }
});

// $.ajax({
//   url: `https://api.trello.com/1/tokens/${APIToken}/webhooks/?key=${APIKey}`,
//   type: 'POST',
//   description: "setup webhook",
//   callbackURL: "https://friendly-stonebraker-4efdef.netlify.com/",
//   idModel: "5c1a5bc5e9a06b362599d79c",
//   success: function(result) {
//       console.log(result);
//   }
// });

// listen for webhook 
// when webhook fires 

//// flashlight
// start flashing light
// click stop button
// stop flashing light
// ping trello to remove 'due date'