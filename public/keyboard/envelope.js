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
  this.sustainLevel = 0.2 * max;
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
  this.param.cancelScheduledValues(time);
  this.param.setValueAtTime(0, time);
  this.param.linearRampToValueAtTime(this.max, time + this.attack);
  this.param.linearRampToValueAtTime(
    this.sustainLevel,
    time + this.attack + this.decay
  );
  this.param.cancelAndHoldAtTime(time + this.attack + this.decay);

  this.param.setTargetAtTime(
    0.00001,
    time + this.attack + this.decay + this.sustain,
    this.sustain / 2
  );
};

Envelope.prototype.triggerRelease = function (time) {
  this.param.cancelScheduledValues(time);

  this.param.setTargetAtTime(0.000001, time, this.sustain / 3);
};
