import Bus from "../lib/Bus";

class InputNode {
  constructor(ctx, audioNote) {
    this.inputNode = audioNote;
    ctx.createMediaElementSource(audioMediaElement);
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
      inputs[index] = new InputNode(
        ctx,
        ctx.createMediaElementSource(audioMediaElement)
      );
      inputs[index].connect(inputMasterGain);
      return inputs[index];
    },
    setPianoInput: (gainNode, index) => {
      var effectChains = new Bus();
      effectChains.attachSource(gainNode);
      effectChains.connect(inputMasterGain);
      inputs[index] = gainNode;
      return inputs[index];
    },
  };
})();

window.audioCtx = gAudioContext;
// window.onclick = function () {
//   if (!window.g_audioCtx) {
//     audioCtx();
//   }
// };
