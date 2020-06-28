import { PianoKeyboard } from "./keyboard/piano.js";
import { Console } from "./_console.js";

export const notes = {
  C: [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01],
  Db: [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
  D: [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64],
  Eb: [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03],
  E: [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
  F: [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
  Gb: [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96],
  G: [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96],
  Ab: [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44],
  A: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0],
  Bb: [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
  B: [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07],
};
const notesOfIndex = Object.values(notes);
export const chords = {
  C: ["C", "E", "G"],
  Db: ["Db", "F", "Ab"],
  D: ["D", "Gb", "A"],
  E: ["E", "Ab", "B"],
  F: ["F", "A", "C"],
  Gb: ["Gb", "Bb", "Db"],
  G: ["G", "B", "D"],
};
export const keys = [
  "a",
  "w",
  "s",
  "e",
  "d",
  "f",
  "t",
  "g",
  "y",
  "h",
  "u",
  "j",
  "k",
];
export const keynotes = "C, Db, D,  Eb,  E,  F,  Gb, G,  Ab, A,  Bb, B, C".split(
  /\s+/
);

export const noteIndexFreq = (noteIndex, octave = 4) =>
  notesOfIndex[noteIndex][octave];

export function _scheduleSequence(piano, notes) {
  const bpm = 60;
  const beats_perSegment = 4;

  var timer = new Worker("./offlinetimer.js");
  timer.onmessage = ({ data }) => {
    Console.log("msg");
    switch (data) {
      case "load":
        timer.postMessage({ interval: (bpm / 60) * 1000 });
        return;
      default:
        break;
    }

    const beatCount = data;

    switch (beatCount % beats_perSegment) {
      case 1:
        piano.settings.gains = [0.3, 0.25, 0.05];
      default:
        Console.log(beatCount, " bc ");
        Console.log(notes);

        if (typeof notes[beatCount] === "undefined") {
          timer.postMessage("stop");
          break;
        }
        notes[beatCount].forEach((noteIndex) => {
          var freq = noteIndexFreq(noteIndex);

          Console.log("playing " + freq + " at " + piano.ctx.currentTime);
          var env = piano._getNote(noteIndexFreq(noteIndex));
          env.trigger(piano.ctx.currentTime);
        });
        break;
    }
  };
}

export function playbackDeamon() {
  window.onmessage = ({ data }) => {
    if (!data.playTrack) return false;
    window.postMessage("setting up");
    _scheduleSequence(data.playTrack);
  };
  window.onunload = () => (window.onmessage = null);
}
