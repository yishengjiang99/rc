const { default: Envelope } = require("./keyboard/envelope");

class InputNode {
  constructor(ctx, audioMediaElement) {
    this.inputNode = ctx.createMediaElementSource(audioMediaElement);
    this.gain = ctx.createGain(1);
    this.statusText = "";
    this.inputNode.connect(this.gain);
  }
  connect(audioNode) {
    this.gain.connect(audioNode);
  }
}

const gAudioContext = (function kAudioContext() {
  var ctx, inputs, inputMasterGain;
  inputs = Array(10);
  function init() {
    ctx = ctx || new AudioContext();
    inputMasterGain = ctx.createGain();
    inputMasterGain.connect(ctx.destination);
  }
  return {
    init,
    ctx,
    setAudioTag: (audioMediaElement, index) => {
      init();
      inputs[index] = new InputNode(ctx, audioMediaElement);
      inputs[index].connect(inputMasterGain);
      return inputs[index];
    }
  };
})();

window.audioCtx = gAudioContext;
const ctx = window.audioCtx.ctx;
// window.onclick = function () {
//   if (!window.g_audioCtx) {
//     audioCtx();
//   }
// };

let osc3cache = {};
const freqmultiplierindex = [0, 0.25, 0.5, 1, 2, 4];
const getOsc3 = freq => {
  osc3cache = osc3cache || {};
  if (!osc3cache[freq]) {
    var osc1 = ctx.createOscillator();
    osc1.frequency.value = note * freq_multiplier;
    osc1.type = "sine";

    var osc2 = ctx.createOscillator();
    osc2.frequency.value = note * freq_multiplier * 2;
    osc2.type = "sine";

    var osc3 = ctx.createOscillator();
    osc2.frequency.value = note * freq_multiplier * 2;
    osc2.type = "sine";

    var gain1 = new GainNode(ctx, { gain: 1 });
    var gain2 = new GainNode(ctx, { gain: 0.4 });
    var gain3 = new GainNode(ctx, { gain: 0.2 });

    var master = new GainNode(ctx, { gain: 0 });

    osc1.connect(gain1).connect(master);
    osc2.connect(gain2).connect(master);
    osc3.connect(gain3).connect(master);
    const [a, d, s, r] = Object.keys(adsr);
    master.connect(ctx.destination);
    osc3cache[freq] = new Envelope(a, d, s, r, master.gain);
  }
  return osc3cache[freq];
};
