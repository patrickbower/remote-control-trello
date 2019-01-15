"use strict";

export function timeFromNow(minutes){
  var date = new Date();
  date.setMinutes( date.getMinutes() + minutes );
  return date
}

export function isMobileDevice() {
  return (typeof window.orientation !== "undefined");
};
