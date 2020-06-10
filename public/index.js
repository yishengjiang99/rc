class InputNode {
  constructor(ctx, audioNode) {
    this.inputNode = audioNode;
    this.gain = ctx.createGain(1);
    this.statusText = "";
    this.inputNode.connect(gain);
  }
  connect(node) {
    this.gain.disconnect();
    this.gain.connect(node);
  }
}

const gAudioContext = (function kAudioContext() {
  var ctx, inputs, inputMasterGain;
  inputs = Array(10);
  return {
    init: () => (ctx = ctx || new AudioContext()),
    setAudioTag: (audioMediaElement, index) => {
      init();
      inputs[index] = new InputNode(ctx, element);
      return inputs[indx];
    },
  };
})();

window.audioCtx = gAudioContext;
// window.onclick = function () {
//   if (!window.g_audioCtx) {
//     audioCtx();
//   }
// };
