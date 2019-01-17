"use strict";

export function timeFromNow(minutes){
  var date = new Date();
  date.setMinutes( date.getMinutes() + minutes );
  return date;
}

export function isMobileDevice() {
  return (typeof window.orientation !== "undefined");
};

export function errorOut(message, error) {
  console.warn(message, error);
  document.querySelector(".error-message").innerText = '🤬 ' + message;
}
