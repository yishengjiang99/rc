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

const osc3cache={};
const freqmultiplierindex = [0, 0.25, 0.5, 1, 2, 4];
const piano={
  osc1: 
}
const getOsc3 = (synth, freq ) =>{
  if(!osc3cache[freq]) {
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
      var gain2 = new GainNode(ctx, { gain:0.4 });
      var gain3 = new GainNode(ctx, { gain:0.2 });

      var master = new GainNote(ctx,{gain:0});

      osc1.connect(gain1).connect(masterNote);
      osc2.connect(offfreq_attenuator).connect(gain);

      osc3cache[PIANO][freq] = [osc1, osc2];
  }
  return osc3cache[synth[freq];
}


const synths = {
  init: function() {
    this.masterGain = new GainNode();
    this.masterGain.connect(ctx.destination);
  },
  PIANO: function(freq, {notes, adsr, octave=2){
    
    var freq_multiplier = freqmultiplierindex[2];
    const freq = typeof notes =='array' ? notes[0] : notes;
    var osc1 = ctx.createOscillator();
    osc1.frequency.value = note * freq_multiplier;
    osc1.type = "square";

    var osc2 = ctx.createOscillator();
    osc2.frequency.value = note * freq_multiplier * 2;
    osc2.type = "sine";
 


  }
}