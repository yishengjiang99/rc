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
    },
  };
})();

window.audioCtx = gAudioContext;
// window.onclick = function () {
//   if (!window.g_audioCtx) {
//     audioCtx();
//   }
// };
