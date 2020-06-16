import { PianoKeyboard } from "./keyboard/piano.js";
import Envelope from "./keyboard/envelope.js";
// import Conductor from "./keyboard/condunctor.js";
import { kAudioContext } from "./gaudio.js";

export { PianoKeyboard, Envelope };

window.onerror = (e) => {
  console.log(e.message);
};
