import { PianoKeyboard } from "./piano.js";

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

export const playSong = function () {
  const bpm = 70;
  const interval = (60 * 1000) / 70 / 4;
  var queue = [];
  var octave = 2;

  var started = 0;
  var timer = new Worker("/timer.js");
};

export function playSequence(data) {
  if (!data.playTrack) return false;
  window.postMessage("setting up");
  var queue = [];
  var piano = PianoKeyboard.getElementById("piano");
  for (const t in data.playTrack) {
    const notes = data.playTrack[notes];
    notes.forEach((e) => queue.push({ t, note }));
  }
  var timer = new Worker("/offlinetimer.js");

  var lastEnvs;
  timer.onmessage = ({ data }) => {
    var cmd = data.split(" ")[0];
    var arg = data.split(" ")[1];
    var last;
    var lastEnvs = lastEnv || [];
    lastEnvs.forEach();
    switch (data) {
      case "load":
        timer.postMessage({ interval, bpm, beats_per_segment });
      case "1":
        piano.settings.gains = [0.9, 0.25, 0.05];
      case "2":
      case "3":
      case "4":
        const beatCount = parseInt(arg1);
        while (notes[0] && notes[0].time <= bearCount) {
          var nextnote = notes.unshift();
          lastEnvs.push(nextnote);
          nextnote.trigger(gain, ctx.currentTime);
        }
        break;
      default:
        break;
    }
  };
}

// window.onclick = async (e) => {
//   if (started) return;
//   var g_audioCtx = await new AudioContext();
//   main();
// };

function main() {
  var p = new PianoKeyboard();
  function fromKeyboard(_seq) {
    let sequence = _seq || "adg arhh|adg arhh";
    const bars = sequence.split("|");
    bars.forEach((bar) => {
      notes = bar.split("");
      notes.forEach((n) => queue.push(n));
    });
  }

  function playtick() {
    var key = queue.unshift();
    var idx = keys.indexOf(key);
    var keynote = keynotes[idx];
    var triads = coords[keynote];
    var freqs = triads.map((keynote) => notes[keynote][octave]);
    p._getNote(freqs);
    p.trigger(g_audioCtx.currentTime);
  }

  timer.onmessage = ({ data }) => {
    switch (data) {
      case "ready":
        timer.postMessage({ bpm: 60, bar: 4, split: 1 / 4 });
        break;
      case "1":
        patch = 1;
      case "2":
      case "3":
      case "4":
        playTick();
        break;
    }
  };
}
