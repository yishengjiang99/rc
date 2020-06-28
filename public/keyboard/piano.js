/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Envelope from "./envelope.js";
import { Piano } from "./waves.js";
import { playbackDeamon, _scheduleSequence } from "../scheduler.js";
import { box } from "./piano.css.js";
const keys = ["a", "w", "s", "e", "d", "f", "t", "g", "y", "h", "u", "j"];

const regularNotes = "261.63, 293.66 , 329.63, 349.23, 392.00, 440.00, 493.88".split(
  ", "
);
const regularKeys = "a, s, d, f, g, h, j";
const blackKeys = ["w, e, t, y, u"];
const notes = [
  261.63,
  277.18,
  293.66,
  311.13,
  329.63,
  349.23,
  369.99,
  392,
  415.3,
  440,
  466.16,
  493.88,
];
const isblack = (key) => ["w", "e", "t", "y", "u"].indexOf(key) >= 0;

const freqmultiplierindex = [0, 0.25, 0.5, 1, 2, 4];
const waveShaper = JSON.parse(Piano);

export class PianoKeyboard extends HTMLElement {
  static get attack() {
    return this.getAttribute("attack");
  }
  static set attack(val) {
    this.setAttribute("attack", val);
  }

  static get observedAttributes() {
    return [
      "attack",
      "release",
      "decay",
      "sustain",
      "params",
      "waveshaper",
      "onNote",
      "onNoteOff",
      "ctx",
      "playtrack",
    ];
  }

  constructor(ctx) {
    super();
    this.asdr = {
      attack: 1,
      decay: 1,
      sustain: 0.1,
      release: 0.01, //0.01
    };
    this.params = {
      min: 0,
      max: 3,
      octave: 2,
    };
    this.ctx = ctx;
    this.waveshaper = waveShaper;
    this.keyDomelements = {};
    this.adsrs = {};
    this.initialized = false;
    function _key(note, key) {
      return `<li
      id='${note}' 
      data-note='${note}' 
      class="${isblack(key) ? "black" : "white"}"> ${key}</li>`;
    }
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>${box}</style><div id=rx></div>`;
    const list = document.createElement("ul");
    [3, 4].forEach((octave) => {
      keys.forEach((key, index) => {
        list.innerHTML += _key(notes[index] * freqmultiplierindex[octave], key);
      });
    });
    this.shadowRoot.appendChild(list); // += "</ul>";
    this.rx = this.shadowRoot.getElementById("rx");

    this._settings = {
      osc3: ["sine", "sine", "sine"],
      chords: [1, 2, 4],
      gains: [1, 0.25, 0.1],
    };

    this.settings = new Proxy(this._settings, (attr, idx, value) => {
      this._settings[attr][idx] = value;
      this.shadowRoot.querySelectorAll(
        `[name="${idx}-${attr}"]`
      )[0].value = value;
    });
  }

  replayEvents(eventz) {
    console.log(eventz);
  }
  connectedCallback() {
    var self = this;
    this.shadowRoot.querySelectorAll("li").forEach((el) => {
      el.addEventListener("mousedown", (e) => {
        if (!e.target.dataset.note) return false;
        const note = parseFloat(e.target.dataset.note);
        if (!self.adsrs[note]) {
          self.adsrs[note] = self._getNote(note);
        }
        self.adsrs[note].trigger(self.ctx.currentTime);
      });

      el.addEventListener("mouseup", (e) => {
        const note = parseFloat(e.target.dataset.note);
        self.adsrs[note] &&
          self.adsrs[note].triggerRelease(self.ctx.currentTime);
      });
    });

    window.onkeydown = function (e) {
      const index = keys.indexOf(e.key);
      if (index < 0) return;
      const note = notes[index];
      self.shadowRoot.getElementById(note).classList.toggle("pressed");
      if (!self.adsrs[note]) {
        self.adsrs[note] = self._getNote(note);
      }
      if (e.repeat) {
        window.postMessage({ hold: note });
        self.adsrs[note].hold(self.ctx.currentTime);
      } else {
        window.postMessage({ trigger: note });

        self.adsrs[note].trigger(self.ctx.currentTime);
      }
    };
    window.onkeyup = function (e) {
      const index = keys.indexOf(e.key);
      if (index > -1) {
        const note = notes[index];
        self.shadowRoot.getElementById(note).classList.toggle("pressed");

        self.adsrs[note] &&
          self.adsrs[note].triggerRelease(self.ctx.currentTime);
        window.postMessage({ release: note });
      }
    };
    playbackDeamon();
  }

  attributeChangedCallback(name, oldval, newval) {
    if (oldval === newval) return;
    switch (name) {
      case "attack":
      case "decay":
      case "sustain":
      case "release":
        this.asdr[name] = parseFloat(newval);
        this.rx.innerHTML = JSON.stringify(this.asdr, null, "1");
        break;
      case "ctx":
        this.ctx = newval;
        break;
    }
  }

  render() {
    return `<ul>
      ${keys.map(
        (value, index) =>
          `<li data-note='${notes[index]}' class="${
            isblack(value) ? "black" : "white"
          }"></li>`
      )}
      </ul>`;
  }

  _getNote(notefreq) {
    this.ctx = this.ctx || window.g_audioCtx || new AudioContext();
    let ctx = this.ctx;
    this.masterGain = this.masterGain || new GainNode(this.ctx);
    this.masterGain.connect(ctx.destination);
    const { attack, decay, sustain, release } = this.asdr;
    const { min, max } = this.params;
    var freq_multiplier = freqmultiplierindex[this.params.octave];
    const baseFreq = notefreq * freq_multiplier;
    const outputGain = new GainNode(ctx, { gain: 0 });
    this._oscs = [0, 1, 2]
      .map(
        (idx) =>
          new OscillatorNode(ctx, {
            type: this._settings.osc3[idx],
            frequency: this._settings.chords[idx] * baseFreq,
          })
      )
      .map((osc, idx) => {
        var _gain = new GainNode(ctx, { gain: this._settings.gains[idx] });
        osc.connect(_gain); //new GainNode(ctx, { gain: this._settings.gains[idx] }))
        _gain.connect(outputGain);
        osc.start(0);
      });
    outputGain.connect(this.masterGain);
    var gainEnvelope = new Envelope(
      min,
      max,
      attack,
      decay,
      sustain,
      release,
      outputGain.gain
    );
    return gainEnvelope;
  }
}

window.customElements.define("piano-keyboard", PianoKeyboard);
