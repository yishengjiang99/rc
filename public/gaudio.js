class InputNode {
  constructor(ctx, audioNote) {
    this.inputNode = audioNote;
    this.gain = ctx.createGain(1);
    this.statusText = "";
    this.inputNode.connect(this.gain);
  }
  connect(audioNode) {
    this.gain.connect(audioNode);
  }
}

export function kAudioContext() {
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
      // var effectChains = new Bus();
      // effectChains.attachSource(gainNode);
      // effectChains.connect(inputMasterGain);
      inputs[index] = gainNode;
      return inputs[index];
    },
  };
}
// var gAudioContext;
// // typeof window !== "undefined" && gAudioContext = kAudioContext();

// document &&
//   window.addEventListener("click", function () {
//     if (gAudioContext !== null) return;
//     else {
//       gAudioContext = kAudioContext();
//     }
//   });
