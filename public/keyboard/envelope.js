export default function Envelope(attack, decay, sustain, release, param) {
  this.min = 0; //
  this.max = 1;
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
  // await sleep(this.decay);
  // this.param.setTargetAtTime(0.001, this.decayTime, this.release);
};
Envelope.prototype.hold = async function (time) {
  this.param.cancelAndHoldAtTime(time + this.attack + this.decay);
  await sleep(this.decay);
  // this.param.setTargetAtTime(0.001, this.decayTime, this.release);
};

Envelope.prototype.triggerRelease = async function (time) {
  this.param.cancelScheduledValues(time);
  let extraWait = 0;
  if (time < this.attackTime) {
    await sleep(this.attackTime - time);
    extraWait = this.attackTime - time;
  }

  this.param.setTargetAtTime(0.000001, time + extraWait, this.release);
};

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
