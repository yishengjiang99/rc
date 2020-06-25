/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Envelope from "./envelope.js";
import { Piano } from "./waves.js";
import { chords } from "./Sound.js";
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
const css = `:host{box-sizing:border-box;} 
ul{
  height:12em;
  position:relative;
  border:1px solid #160801;
  border-radius:1em;
  background:black
  max-width:80em;
} 
li {margin:0;padding:0;list-style:none;position:relative;float:left} 
ul .white{height:12em;width:3.2em;z-index:1;border-left:1px solid #bbb;border-bottom:1px solid #bbb;border-radius:0 0 5px 5px;box-shadow:-1px 0 0 rgba(255,255,255,.8) inset,0 0 5px #ccc inset,0 0 3px rgba(0,0,0,.2);background:linear-gradient(to bottom,#eee 0,#fff 100%);margin:0 0 0 -1em}
ul .white:active{border-top:1px solid #777;border-left:1px solid #999;border-bottom:1px solid #999;box-shadow:2px 0 3px rgba(0,0,0,.1) inset,-5px 5px 20px rgba(0,0,0,.2) inset,0 0 3px rgba(0,0,0,.2);background:linear-gradient(to bottom,#fff 0,#e9e9e9 100%)}
ul .white.pressed{border-top:1px solid #777;border-left:1px solid #999;border-bottom:1px solid #999;box-shadow:2px 0 3px rgba(0,0,0,.1) inset,-5px 5px 20px rgba(0,0,0,.2) inset,0 0 3px rgba(0,0,0,.2);background:linear-gradient(to bottom,#fff 0,#e9e9e9 100%)}
.black{height:8em;width:2em;margin:0 0 0 -1em;z-index:2;border:1px solid #000;border-radius:0 0 3px 3px;box-shadow:-1px -1px 2px rgba(255,255,255,.2) inset,0 -5px 2px 3px rgba(0,0,0,.6) inset,0 2px 4px rgba(0,0,0,.5);background:linear-gradient(45deg,#222 0,#555 100%)}
.black:active{box-shadow:-1px -1px 2px rgba(255,255,255,.2) inset,0 -2px 2px 3px rgba(0,0,0,.6) inset,0 1px 2px rgba(0,0,0,.5);background:linear-gradient(to right,#444 0,#222 100%)}.a,.c,.d,.f,.g{margin:0 0 0 -1em}ul li:first-child{border-radius:5px 0 5px 5px}ul li:last-child{border-radius:0 5px 5px 5px}
.black.pressed{box-shadow:-1px -1px 2px rgba(255,255,255,.2) inset,0 -2px 2px 3px rgba(0,0,0,.6) inset,0 1px 2px rgba(0,0,0,.5);background:linear-gradient(to right,#444 0,#222 100%)}.a,.c,.d,.f,.g{margin:0 0 0 -1em}ul li:first-child{border-radius:5px 0 5px 5px}ul li:last-child{border-radius:0 5px 5px 5px}`;

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
    ];
  }

  constructor() {
    super();
    this.asdr = {
      attack: 0.05,
      decay: 0.05,
      sustain: 0.1,
      release: 0.01, //0.01
    };
    this.params = {
      min: 0,
      max: 2,
      octave: 2,
    };
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
    this.shadowRoot.innerHTML = `<style>${css}</style><div id=rx></div>`;
    const list = document.createElement("ul");
    [2, 3, 4].forEach((octave) => {
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

  connectedCallback() {
    var self = this;
    this.shadowRoot.querySelectorAll("li").forEach((el) => {
      el.addEventListener("mousedown", (e) => {
        if (!e.target.dataset.note) return false;
        const note = parseFloat(e.target.dataset.note);
        if (!adsrs[note]) {
          adsrs[note] = _getNote(note);
        }
        adsrs[note].trigger(ctx.currentTime);
      });

      el.addEventListener("mouseup", (e) => {
        const note = parseFloat(e.target.dataset.note);
        adsrs[note] && adsrs[note].triggerRelease(ctx.currentTime);
      });
    });

    window.onkeydown = function (e) {
      const keyIndex = keys.indexOf(e.key);
      if (keyIndex < 0) return;

      playNoteIndex(keyIndex).bind(self);
    };
    window.onkeyup = function (e) {
      const index = keys.indexOf(e.key);
      if (index > -1) {
        const note = notes[index];
        shadowRoot.getElementById(note).classList.toggle("pressed");
        releaseNote(index).bind(self);
      }
    };
    window.onmessage = function (e) {
      const msg = e.data;
      if (msg.trigger && msg.note) {
        (adsrs[msg.note] || _getNote(notes[msg.note])).trigger(ctx.currentTime);
      }
    };
  }

  playNoteIndex = (index) => {
    const note = notes[index];
    // self.shadowRoot.getElementById(note).classList.toggle("pressed");
    if (!adsrs[note]) {
      adsrs[note] = _getNote(note);
    }
    if (e.repeat) {
      window.postMessage({ hold: note });
      adsrs[note].hold(ctx.currentTime);
    } else {
      window.postMessage({ trigger: note });

      adsrs[note].trigger(ctx.currentTime);
    }
  };

  releaseNote(index) {
    const note = notes[index];
    var self = this;
    adsrs && adsrs[note] && adsrs[note].triggerRelease(ctx.currentTime);
    window.postMessage({ release: note });
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
        Object.values(this.adsrs).forEach(
          (env) => (env[name] = parseFloat(newval))
        );
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
  setupIfNeeded() {
    if (!this.ctx) {
      this.ctx = this.ctx || window.g_audioCtx || new AudioContext();
    }
    this.masterGain = this.masterGain || new GainNode(this.ctx);
    this.masterGain.connect(ctx.destination);
  }
  _getNote(notefreq) {
    setupIfNeeded();
    let ctx = this.ctx;
    const { attack, decay, sustain, release } = this.asdr;
    const { min, max } = this.params;
    var freq_multiplier = freqmultiplierindex[this.params.octave];
    const baseFreq = notefreq * freq_multiplier;
    const outputGain = new GainNode(ctx, { gain: 0 });

    var freqs =
      typeof notefreq == array
        ? notefreq
        : chords.map((multi) => multi * notefreq);

    this._oscs = freqs
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

var sound = require("Sound");
