export default function Envelope(
  min,
  max,
  attack,
  decay,
  sustain,
  release,
  param
) {
  this.min = min; //
  this.max = max;
  this.attack = attack;
  this.release = release;
  this.releaseTimeConstant = 0.5 * release;
  this.sustain = sustain;
  this.decay = decay;
  this.param = param;
}
const _console = window._console || console;
Envelope.prototype.trigger = function (time) {
  this.attackTime = time + this.attack; //reach attach val at attackTime
  this.decayTime = time + this.attack + this.decay; //reach decay val at decayTime
  this.sustainTime = time + this.attack + this.decay + this.sustain;
  this.releaseTime =
    time + this.attack + this.decay + this.sustain + this.release;

  this.param.linearRampToValueAtTime(this.max, this.attackTime);
  var that = this;

  setTimeout(function () {
    //TODO: find a 21st century method to do this.
    //maybe use https://github.com/Tonejs/Tone.js/wiki/Transport and npm install 500Mbs of libraries
    that.param.linearRampToValueAtTime(that.max * 0.5, that.decayTime);
    _console.log("start decay at at " + that.decayTime);
    setTimeout(function () {
      that.param.setTargetAtTime(0, that.releaseTime, that.releaseTimeConstant);
    }, that.decay + that.sustain);
  }, this.attack);
};

Envelope.prototype.triggerRelease = function (time) {
  this.param.setTargetAtTime(0, time + this.release, this.releaseTimeConstant);
};
