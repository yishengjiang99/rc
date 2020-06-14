import { PianoKeyboard } from "./keyboard/piano.js";
import Envelope from "./keyboard/envelope.js";
import Conductor from "./keyboard/conductor.js";
import { kAudioContext } from "../gaudio.js";

export { PianoKeyboard, Envelope };

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/keyboard/ticker.js");
  });
}
document.addEventListener("DOMContentLoaded", function (event) {
  // Your code to run since DOM is loaded and ready
  const ctx = kAudioContext().ctx;
  const conductor = Conductor();
  var ticker = new Worker("./ticker.js");
  
});
var conductor = Conductor();

window.onload = () => {
  conductor = Conductor();
  window.conductor = conductor;
  const btn = document.getElementById("playbackBtn");
  btn.onClick = () => conductor.playback();
};

window.onmessage = (e) => {
  if (e.data.evt === "triggerAttackRelease") {
    conductor.playback();
  }
};

window.onmessage = (msg) => {};
