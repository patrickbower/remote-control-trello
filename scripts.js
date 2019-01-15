import orientation from './orientation.js';
import flashlight from './flashlight.js';
import trello from './trello.js';

let Orientation = new orientation();
Orientation.init();

let Flashlight = new flashlight();
Flashlight.init();

let Trello = new trello();
Trello.init();  

//// start up
//√ open app
//√ loads up
//√ shows the first card

//// basic actions
//√ flip phone to start
//√ (flash led once)
//√ add due date to card
// start timer

//// timer runs out
// flash led
// click complete button
// - completed
// - non complete

//// completed
// archive card, get next
// reset timer
// reset card ui

//// non complete
// { restart process }
 
//// turn device over before timer runs out
// click complete button
// archive card, get next
// reset card ui