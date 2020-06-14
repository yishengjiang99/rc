import { PianoKeyboard } from "./keyboard/piano.js";
import Envelope from "./keyboard/envelope.js";
// import Conductor from "./keyboard/condunctor.js";
import { kAudioContext } from "../gaudio.js";

export { PianoKeyboard, Envelope };

// document.addEventListener("DOMContentLoaded", function (event) {
//   // Your code to run since DOM is loaded and ready
//   const ctx = kAudioContext().ctx;

//   var ticker = new Worker("./ticker.js");
// });
// var conductor = Conductor();

// window.onload = () => {

//   const btn = document.getElementById("playbackBtn");
//   btn.onClick = () => conductor.playback();
// };

// // window.onmessage = (e) => {
// //   if (e.data.evt === "triggerAttackRelease") {
// //     conductor.playback();
// //   }
// // };

// window.onmessage = (msg) => {};
