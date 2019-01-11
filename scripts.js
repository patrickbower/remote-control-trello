import orientation from './orientation.js';
import flashlight from './flashlight.js';
import trello from './trello.js';

let Orientation = new orientation();
Orientation.init();

let Flashlight = new flashlight();
Flashlight.init();

let Trello = new trello();
// Trello.init();

  // ping Trello
  //// Trello
  // store API/board/list key
  // add 'due date' to first card in list
  // on success callback show stop button to cancel anytime
  // display simple timer
  // when timestamp due date elapsed
  //// flashlight
  // start flashing light
  // click stop button
  // stop flashing light
  // ping Trello to remove 'due date'