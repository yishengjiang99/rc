const notes = {
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
const chords = {
  C: ["C", "E", "G"],
  Db: ["Db", "F", "Ab"],
  D: ["D", "Gb", "A"],
  E: ["E", "Ab", "B"],
  F: ["F", "A", "C"],
  "F#": ["Gb", "Bb", "Db"],
  G: ["G", "B", "D"],
};

export const keys = "a, w, s, e, d, f, t, g, y, h, u, j, k".split(",");
export const keynotes = "C,Db,D,Eb,E,F,Gb,G,Ab,A,Bb,B".split(",");

export const OSC3 = function (noteIndex, adsr, gain_prog) {
  window.gAudioContext = window.gAudioContext || new AudioContext();
  const ctx = gAudioContext;

  const [g1, g2, g3] = gain_prog; // [].gainProg.[osc1].gain[osc1, osc2, lpf]; // {fundmental: 0.5, first:0.2, second:0.4};
  const { attack, decay, sustain, release } = adsr;

  const note = keynotes[noteIndex];
  const triads = chords[note];
  const freqs = !triads
    ? [note, note, note]
    : triads.filter((note) => notes[note]).map((note) => notes[note][2]);
  const min = 0;
  const max = 1;
  let gain = new GainNode(ctx);
  var freq_multiplier = noteIndex[2];
  var gain1 = new GainNode(ctx, { gain: g1 });
  var gain2 = new GainNode(ctx, { gain: g2 });
  var gain3 = new GainNode(ctx, { gain: g3 });
  var osc1 = new OscillatorNode(ctx, {
    frequency: freqs[0],
    type: "sine",
  });
  var osc2 =
    freqs[1] &&
    freqs[1] > 0 &&
    new OscillatorNode(ctx, {
      frequency: freqs[1],
      type: "sine",
      detune: -2,
    });
  var osc3 =
    freqs[2] &&
    freqs[2] > 0 &&
    new OscillatorNode(ctx, {
      freqs: freqs[2],
      type: "sine",
      detune: -3,
    });
  var lfo = new OscillatorNode(ctx, {
    frequency: 60,
    type: "sine",
  });
  var lpf1 = new BiquadFilterNode(ctx, { frequency: Math.pow(2, 8) });
  var lpf2 = new BiquadFilterNode(ctx, { frequency: Math.pow(2, 8) });

  var compression = new DynamicsCompressorNode(ctx, {
    attack: 0.1,
    release: 0.1,
    threshold: -40,
  });

  var gainEnvelope = new Envelope(
    min,
    max,
    attack,
    decay,
    sustain,
    release,
    gain.gain
  );

  osc1.connect(gain1).connect(gain);
  osc2.connect(gain2).connect(lpf2).connect(gain);
  osc3.connect(gain3).connect(lpf1).connect(gain);
  gain.connect(ctx.destination);

  osc1.start(0);
  osc2.start(0);
  return gainEnvelope;
};

export function Envelope(min, max, attack, decay, sustain, release, param) {
  this.min = min; //
  this.max = max;
  this.sustainLevel = this.max * sustain;
  this.attack = attack;
  this.release = release;
  this.releaseTimeConstant = 0.5 * release;
  this.decay = decay;
  this.param = param;
}
Envelope.prototype.trigger = async function (time) {
  this.attackTime = time + this.attack; //reach attach val at attackTime
  this.decayTime = time + this.attack + this.decay; //reach decay val at decayTime
  this.param.cancelScheduledValues(time);
  this.param.setValueAtTime(0, time);
  this.param.linearRampToValueAtTime(this.max, time + this.attack);
  await sleep(this.attack - 0.001);
  this.param.linearRampToValueAtTime(
    this.sustainLevel,
    time + this.attack + this.decay
  );
  await sleep(this.decay);
  this.param.setTargetAtTime(0.001, this.decayTime, this.release);
};
Envelope.prototype.hold = function (time) {
  this.param.cancelAndHoldAtTime(time + this.attack + this.decay);
};

Envelope.prototype.triggerRelease = async function (time) {
  this.param.cancelScheduledValues(time);
  let extraWait = 0;
  if (time < this.attackTime) {
    await sleep(this.attackTime - time);
    extraWait = this.attackTime - time;
  }

  this.param.setTargetAtTime(
    0.000001,
    time + extraWait,
    this.release + extraWait
  );
};

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
