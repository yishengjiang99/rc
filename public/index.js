function audioCtx() {
  window.g_audioCtx = window.g_audioCtx || new AudioContext();
  var ctx = window.g_audioCtx;
  var inputs = Array(10);
  var inputMasterGain = new GainNode(ctx, { gain: 1 });
  inputMasterGain.connect(ctx.destination);
  const AudioInput = function (inputNode) {
    var node = inputNode;
    var gain = new GainNode(ctx, { gain: 1 });
    var stateText = "";
    node.connect(gain).connect(inputMasterGain);
    return {
      inputNode,
      gain,
      stateText,
    };
  };

  return {
    ctx,
    elementInput: function (audioMediaElement, index) {
      const node = AudioInput(ctx.createMediaElementSource(audioMediaElement));
      inputs[index] = node;
      return node;
    },
  };
}

window.audioCtx = audioCtx;
// window.onclick = function () {
//   if (!window.g_audioCtx) {
//     audioCtx();
//   }
// };
